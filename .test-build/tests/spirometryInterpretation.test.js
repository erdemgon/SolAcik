"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const gliInterpretation_1 = require("../utils/spirometry/gliInterpretation");
(0, node_test_1.default)('maps spirometry parameters to expected units', () => {
    strict_1.default.equal((0, gliInterpretation_1.parameterUnit)('FEV1'), 'L');
    strict_1.default.equal((0, gliInterpretation_1.parameterUnit)('FVC'), 'L');
    strict_1.default.equal((0, gliInterpretation_1.parameterUnit)('FEV1_FVC'), 'ratio');
    strict_1.default.equal((0, gliInterpretation_1.parameterUnit)('FEF25_75'), 'L/s');
});
(0, node_test_1.default)('interprets values below LLN using z-score threshold', () => {
    strict_1.default.equal((0, gliInterpretation_1.interpretParameter)({
        parameter: 'FEV1',
        predicted: 1.4,
        lln: 1.1,
        measured: 1,
        zScore: gliInterpretation_1.LLN_Z - 0.1,
    }), 'LLN altında');
    strict_1.default.equal((0, gliInterpretation_1.interpretParameter)({
        parameter: 'FEV1_FVC',
        predicted: 0.86,
        lln: 0.78,
        measured: 0.72,
        zScore: gliInterpretation_1.LLN_Z - 0.1,
    }), 'LLN altında; obstrüksiyon lehine olabilir, klinik bağlamla yorumla');
});
(0, node_test_1.default)('adds obstruction and MEF caution messages without diagnosing disease', () => {
    const result = {
        engine: 'local_coefficients',
        source: 'test',
        sourceVersion: 'test',
        warnings: [],
        results: [
            {
                parameter: 'FEV1_FVC',
                predicted: 0.86,
                lln: 0.78,
                measured: 0.72,
                zScore: -2,
                interpretation: 'LLN altında',
                unit: 'ratio',
            },
            {
                parameter: 'FVC',
                predicted: 1.6,
                lln: 1.3,
                measured: 1.55,
                zScore: -0.2,
                interpretation: 'Normal aralıkta',
                unit: 'L',
            },
            {
                parameter: 'FEF25_75',
                predicted: 1.7,
                lln: 1.1,
                measured: 1,
                zScore: -2,
                interpretation: 'LLN altında',
                unit: 'L/s',
            },
        ],
    };
    const messages = (0, gliInterpretation_1.buildSpirometryInterpretation)(result);
    strict_1.default.ok(messages.some((message) => message.includes('obstrüksiyon lehine olabilir')));
    strict_1.default.ok(messages.every((message) => !message.includes('astım tanısı')));
});
