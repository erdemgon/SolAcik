import {
  PftParameter,
  PftReferenceEngine,
  PftReferenceEngineResult,
  PftReferenceInput,
} from '../src/modules/pft/referenceEngines/types';
import {
  calculateRvTlcRatio,
  createPftResultItem,
} from '../utils/pft/pftInterpretation';

const SOURCE = 'GLI PFT local coefficient engine';

export const pftLocalEngine: PftReferenceEngine = {
  async calculate(input: PftReferenceInput): Promise<PftReferenceEngineResult> {
    const measured = { ...input.measured };
    if (input.testType === 'lungVolume') {
      measured.RV_TLC = calculateRvTlcRatio({
        rvMeasured: measured.RV,
        tlcMeasured: measured.TLC,
      });
    }

    const items = Object.entries(measured)
      .filter((entry): entry is [PftParameter, number] => {
        const [, value] = entry;
        return value !== null && value !== undefined && Number.isFinite(value);
      })
      .map(([parameter, value]) =>
        createPftResultItem({
          testType: input.testType,
          parameter,
          measured: value,
          unit: unitForParameter(parameter, input.unitSystem),
          source: SOURCE,
        }),
      );

    return {
      engineStatus: 'unavailable',
      engineMessageTr:
        'Bu referans seti henüz yerel veri dosyası içermiyor; predicted, LLN, ULN ve z-skor hesaplanmadı.',
      items,
      warnings: [
        'TLCO/DLCO, akciğer volümleri ve MBW için yerel GLI coefficient/lookup veri dosyası bağlı değil.',
        'Sahte formül veya yaklaşık predicted değer üretilmedi.',
      ],
    };
  },
};

function unitForParameter(
  parameter: PftParameter,
  unitSystem: PftReferenceInput['unitSystem'],
) {
  if (parameter === 'TLCO') return unitSystem === 'traditional' ? 'mL/min/mmHg' : 'mmol/min/kPa';
  if (parameter === 'KCO') return unitSystem === 'traditional' ? 'mL/min/mmHg' : 'mmol/min/kPa/L';
  if (parameter === 'FEV1_FVC' || parameter === 'RV_TLC' || parameter === 'LCI') return 'ratio';
  if (parameter === 'FEF25_75') return 'L/s';
  return 'L';
}
