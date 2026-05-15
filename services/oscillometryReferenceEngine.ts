import { getOscReferenceSet } from '../data/oscillometry/referenceSets';
import {
  OscReferenceEngineInput,
  OscReferenceEngineResult,
  OscResultItem,
} from '../src/modules/oscillometry/referenceEngines/types';
import { calculateR5R20 } from '../utils/oscillometry/oscCalculations';
import { buildOscMessages, buildOscReport, interpretOscZScore } from '../utils/oscillometry/oscInterpretation';
import { buildOscQualityWarnings } from '../utils/oscillometry/oscQuality';

export async function calculateOscillometry(
  input: OscReferenceEngineInput,
): Promise<OscReferenceEngineResult> {
  const referenceSet = getOscReferenceSet(input.referenceSetId);
  const measured = {
    ...input.measured,
    R5_R20: input.measured.R5_R20 ?? calculateR5R20({ r5: input.measured.R5, r20: input.measured.R20 }),
  };
  const warnings = [
    ...buildOscQualityWarnings(input.quality),
    ...buildReferenceWarnings(input, referenceSet),
  ];

  const items: OscResultItem[] = Object.entries(measured)
    .filter((entry): entry is [keyof typeof measured, number] => {
      const [, value] = entry;
      return value !== null && value !== undefined && Number.isFinite(value);
    })
    .map(([parameter, value]) => {
      const messages = buildOscMessages(parameter, 'not_interpretable');
      return {
        parameter,
        measured: value,
        predicted: null,
        zScore: null,
        lln: null,
        uln: null,
        percentPredicted: null,
        unit: parameter === 'AX' ? 'kPa/L' : parameter === 'Fres' ? 'Hz' : 'kPa/L/s',
        interpretation: interpretOscZScore(parameter, null),
        sourceReferenceSet: referenceSet,
        ...messages,
      };
    });

  const report = buildOscReport(items);
  if (!referenceSet.coefficientsAvailable) {
    warnings.push('Seçilen referans seti için verified coefficient JSON yok; z-skor/predicted üretilmedi.');
  }

  return {
    referenceSet,
    items,
    warnings,
    reportTr: report.tr,
    reportEn: report.en,
  };
}

function buildReferenceWarnings(
  input: OscReferenceEngineInput,
  referenceSet: ReturnType<typeof getOscReferenceSet>,
) {
  const warnings: string[] = [];
  if (
    referenceSet.device !== 'Any IOS/FOT device' &&
    referenceSet.device !== 'IOS' &&
    input.device !== referenceSet.device
  ) {
    warnings.push('Selected reference equation may not be appropriate for this device.');
  }
  if (
    input.ageYears !== null &&
    ((referenceSet.ageMin !== null && input.ageYears < referenceSet.ageMin) ||
      (referenceSet.ageMax !== null && input.ageYears > referenceSet.ageMax))
  ) {
    warnings.push('Reference range exceeded: yaş seçilen referans aralığı dışında.');
  }
  if (
    input.heightCm !== null &&
    ((referenceSet.heightMinCm !== null && input.heightCm < referenceSet.heightMinCm) ||
      (referenceSet.heightMaxCm !== null && input.heightCm > referenceSet.heightMaxCm))
  ) {
    warnings.push('Reference range exceeded: boy seçilen referans aralığı dışında.');
  }
  return warnings;
}
