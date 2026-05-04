import {
  GliReferenceSet,
  GliParameter,
  GliSpirometryInput,
  GliSpirometryParameterResult,
  GliSpirometryResult,
  Sex,
} from '../utils/spirometry/gliTypes';
import {
  interpretParameter,
  parameterUnit,
} from '../utils/spirometry/gliInterpretation';
import { calculateZScore, GliLms, valueAtZ } from '../utils/spirometry/gliLms';
import {
  gli2012Lookup,
  gli2012LookupSource,
  Gli2012LookupRow,
} from '../data/spirometry/gli2012Coefficients';
import {
  gli2022GlobalLookup,
  gli2022GlobalLookupSource,
  Gli2022GlobalLookupRow,
} from '../data/spirometry/gli2022GlobalCoefficients';

const parameters: GliParameter[] = ['FEV1', 'FVC', 'FEV1_FVC', 'FEF25_75'];

export async function runGliLocalEngine(
  input: GliSpirometryInput,
): Promise<GliSpirometryResult> {
  const results: GliSpirometryParameterResult[] = parameters.map((parameter) =>
    calculateLocalParameter(input, parameter),
  );
  const source =
    input.referenceSet === 'GLI2022_GLOBAL'
      ? gli2022GlobalLookupSource
      : gli2012LookupSource;

  return {
    engine: 'local_coefficients',
    source: source.source,
    sourceVersion: `${source.package} ${source.version}; ${source.license}`,
    results,
    warnings: [
      'Yerel GLI motoru CRAN rspiro 0.5 içindeki GLI lookup tablolarından türetilmiştir; resmi GLI hesaplayıcı ile validasyon önerilir.',
      'rspiro GPL >= 2 lisanslıdır; dağıtım lisansı buna göre yönetilmelidir.',
    ],
  };
}

function calculateLocalParameter(
  input: GliSpirometryInput,
  parameter: GliParameter,
): GliSpirometryParameterResult {
  const measured = getMeasured(input, parameter);
  const unit = parameterUnit(parameter);

  if (input.referenceSet === 'GLI2022_GLOBAL' && parameter === 'FEF25_75') {
    return {
      parameter,
      predicted: null,
      lln: null,
      uln: null,
      measured,
      percentPredicted: null,
      zScore: null,
      interpretation: 'Hesaplanamadı / referans yok',
      unit,
      warning:
        'GLI Global 2022 race-neutral referansta FEF25–75 / MEF25–75 için predicted/z-skor mevcut değildir.',
    };
  }

  const lms =
    input.referenceSet === 'GLI2022_GLOBAL'
      ? getGli2022GlobalLms(input, parameter)
      : getGli2012Lms(input, parameter);

  if (!lms) {
    return {
      parameter,
      predicted: null,
      lln: null,
      uln: null,
      measured,
      percentPredicted: null,
      zScore: null,
      interpretation: 'Hesaplanamadı / referans yok',
      unit,
      warning: 'Bu parametre için seçilen GLI referansında hesaplama mevcut değil.',
    };
  }

  const lln = valueAtZ(-1.645, lms);
  const uln = valueAtZ(1.645, lms);
  const zScore = measured && measured > 0 ? calculateZScore(measured, lms) : null;
  const percentPredicted = measured && measured > 0 ? (measured / lms.m) * 100 : null;
  const interpretation = interpretParameter({
    parameter,
    predicted: lms.m,
    lln,
    measured,
    zScore,
  });

  return {
    parameter,
    predicted: lms.m,
    lln,
    uln,
    measured,
    percentPredicted,
    zScore,
    interpretation,
    unit,
  };
}

function getGli2012Lms(input: GliSpirometryInput, parameter: GliParameter): GliLms | null {
  const gender = toRspiroGender(input.sex);
  const f = toGli2012Parameter(parameter);
  const ethnicity = toRspiroEthnicity(input.referenceSet);
  const ageYears = input.ageMonths / 12;
  const agebound = Math.floor(ageYears * 4) / 4;
  const row = gli2012Lookup.find(
    (item) => item[0] === gender && item[1] === f && nearlyEqual(item[17], agebound),
  );
  if (!row) return null;
  return calculateGli2012LmsFromRow(row, ageYears, input.heightCm, ethnicity);
}

function calculateGli2012LmsFromRow(
  row: Gli2012LookupRow,
  ageYears: number,
  heightCm: number,
  ethnicity: number,
): GliLms {
  const [
    ,
    ,
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    p0,
    p1,
    p2,
    p3,
    p4,
    p5,
    q0,
    q1,
    agebound,
    l0,
    l1,
    m0,
    m1,
    s0,
    s1,
  ] = row;
  const lSpline = l0 + ((l1 - l0) * (ageYears - agebound)) / 0.25;
  const mSpline = m0 + ((m1 - m0) * (ageYears - agebound)) / 0.25;
  const sSpline = s0 + ((s1 - s0) * (ageYears - agebound)) / 0.25;
  const logAge = Math.log(ageYears);

  return {
    l: q0 + q1 * logAge + lSpline,
    m: Math.exp(
      a0 +
        a1 * Math.log(heightCm) +
        a2 * logAge +
        a3 * Number(ethnicity === 2) +
        a4 * Number(ethnicity === 3) +
        a5 * Number(ethnicity === 4) +
        a6 * Number(ethnicity === 5) +
        mSpline,
    ),
    s: Math.exp(
      p0 +
        p1 * logAge +
        p2 * Number(ethnicity === 2) +
        p3 * Number(ethnicity === 3) +
        p4 * Number(ethnicity === 4) +
        p5 * Number(ethnicity === 5) +
        sSpline,
    ),
  };
}

function getGli2022GlobalLms(
  input: GliSpirometryInput,
  parameter: GliParameter,
): GliLms | null {
  const gender = toRspiroGender(input.sex);
  const f = toGli2022Parameter(parameter);
  if (!f) return null;
  const ageYears = input.ageMonths / 12;
  const agebound = Math.floor(ageYears * 4) / 4;
  const row = gli2022GlobalLookup.find(
    (item) => item[4] === gender && item[5] === f && nearlyEqual(item[0], agebound),
  );
  if (!row) return null;
  return calculateGli2022GlobalLmsFromRow(row, ageYears, input.heightCm, input.sex, parameter);
}

function calculateGli2022GlobalLmsFromRow(
  row: Gli2022GlobalLookupRow,
  ageYears: number,
  heightCm: number,
  sex: Sex,
  parameter: GliParameter,
): GliLms {
  const [, mSpline, sSpline] = row;
  const logAge = Math.log(ageYears);
  const logHeight = Math.log(heightCm);

  if (sex === 'male' && parameter === 'FEV1') {
    return {
      l: 1.22703,
      m: Math.exp(-11.399108 + 2.462664 * logHeight - 0.011394 * logAge + mSpline),
      s: Math.exp(-2.256278 + 0.080729 * logAge + sSpline),
    };
  }
  if (sex === 'male' && parameter === 'FVC') {
    return {
      l: 0.9346,
      m: Math.exp(-12.629131 + 2.727421 * logHeight + 0.009174 * logAge + mSpline),
      s: Math.exp(-2.195595 + 0.068466 * logAge + sSpline),
    };
  }
  if (sex === 'male' && parameter === 'FEV1_FVC') {
    return {
      l: 3.8243 - 0.3328 * logAge,
      m: Math.exp(1.022608 - 0.218592 * logHeight - 0.027586 * logAge + mSpline),
      s: Math.exp(-2.882025 + 0.068889 * logAge + sSpline),
    };
  }
  if (sex === 'female' && parameter === 'FEV1') {
    return {
      l: 1.21388,
      m: Math.exp(-10.901689 + 2.385928 * logHeight - 0.076386 * logAge + mSpline),
      s: Math.exp(-2.364047 + 0.129402 * logAge + sSpline),
    };
  }
  if (sex === 'female' && parameter === 'FVC') {
    return {
      l: 0.899,
      m: Math.exp(-12.055901 + 2.621579 * logHeight - 0.035975 * logAge + mSpline),
      s: Math.exp(-2.310148 + 0.120428 * logAge + sSpline),
    };
  }
  return {
    l: 6.649 - 0.992 * logAge,
    m: Math.exp(0.9189568 - 0.1840671 * logHeight - 0.0461306 * logAge + mSpline),
    s: Math.exp(-3.171582 + 0.144358 * logAge + sSpline),
  };
}

function getMeasured(input: GliSpirometryInput, parameter: GliParameter) {
  if (parameter === 'FEV1') return input.observed?.fev1L ?? null;
  if (parameter === 'FVC') return input.observed?.fvcL ?? null;
  if (parameter === 'FEV1_FVC') return input.observed?.fev1FvcRatio ?? null;
  return input.observed?.fef2575Lps ?? null;
}

function toRspiroGender(sex: Sex) {
  return sex === 'male' ? 1 : 2;
}

function toRspiroEthnicity(referenceSet: GliReferenceSet) {
  if (referenceSet === 'GLI2012_CAUCASIAN') return 1;
  if (referenceSet === 'GLI2012_AFRICAN_AMERICAN') return 2;
  if (referenceSet === 'GLI2012_NE_ASIAN') return 3;
  if (referenceSet === 'GLI2012_SE_ASIAN') return 4;
  return 5;
}

function toGli2012Parameter(parameter: GliParameter) {
  if (parameter === 'FEV1_FVC') return 'FEV1FVC';
  if (parameter === 'FEF25_75') return 'FEF2575';
  return parameter;
}

function toGli2022Parameter(parameter: GliParameter) {
  if (parameter === 'FEV1_FVC') return 'FEV1FVC';
  if (parameter === 'FEF25_75') return null;
  return parameter;
}

function nearlyEqual(left: number, right: number) {
  return Math.abs(left - right) < 1e-9;
}
