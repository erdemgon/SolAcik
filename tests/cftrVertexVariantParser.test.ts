import assert from 'node:assert/strict';
import test from 'node:test';
import { buildCftrVariantUpdateSnapshotFromExtractedText } from '../services/cftrVertexVariantUpdater';
import { parseVertexResponsiveVariantsFromText } from '../utils/cftr/vertexVariantParser';

test('extracts normalized variant names from a Vertex PI table text block', () => {
  const result = parseVertexResponsiveVariantsFromText({
    drugName: 'TRIKAFTA',
    sourceUrl: 'https://example.test/trikafta.pdf',
    sourceVersion: 'test',
    expectedTableLabel: 'List of CFTR Gene Mutations that are Responsive to TRIKAFTA',
    extractedText:
      'Intro text. List of CFTR Gene Mutations that are Responsive to TRIKAFTA F508DEL G551D 3849+10kbC->T N1303K References',
  });

  assert.deepEqual(result.variants, ['F508del', 'G551D', '3849+10kbC>T', 'N1303K']);
  assert.equal(result.requiresEditorReview, true);
  assert.deepEqual(result.warnings, []);
});

test('does not silently parse when the expected Vertex table label is missing', () => {
  const result = parseVertexResponsiveVariantsFromText({
    drugName: 'ALYFTREK',
    sourceUrl: 'https://example.test/alyftrek.pdf',
    sourceVersion: 'test',
    expectedTableLabel: 'List of CFTR Gene Variants Responsive to ALYFTREK',
    extractedText: 'A different PDF section with F508del G551D.',
  });

  assert.deepEqual(result.variants, []);
  assert.equal(result.requiresEditorReview, true);
  assert.ok(result.warnings.some((warning) => warning.includes('Beklenen Vertex tablo başlığı')));
});

test('marks changed Vertex source snapshots as requiring editor review', () => {
  const snapshot = buildCftrVariantUpdateSnapshotFromExtractedText({
    previousHashesBySourceId: {
      trikafta_vertex_pi: 'old-hash',
    },
    currentHashesBySourceId: {
      trikafta_vertex_pi: 'new-hash',
    },
    extractedTextsBySourceId: {
      trikafta_vertex_pi:
        'List of CFTR Gene Mutations that are Responsive to TRIKAFTA F508del G551D References',
    },
    generatedAtIso: '2026-05-14T00:00:00.000Z',
  });

  const trikafta = snapshot.checks.find((check) => check.source.id === 'trikafta_vertex_pi');
  assert.ok(trikafta);
  assert.equal(trikafta.status, 'changed_requires_editor_review');
  assert.equal(snapshot.applyAutomatically, false);
});
