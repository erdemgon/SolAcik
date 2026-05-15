import type {
  EditorFeedbackPayload,
  EditorFeedbackRecord,
  EditorFeedbackStatus,
} from '../types/editorFeedback';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

type ApiFeedbackRow = {
  id: string;
  created_at: string;
  module_title: string;
  user_name: string;
  app_role: string;
  clinical_role: string;
  contribution_area: string;
  edit_intent: string;
  feedback: string;
  suggested_edit: string;
  source_note: string;
  command_text: string;
  status: EditorFeedbackStatus;
};

export async function submitEditorFeedback(payload: EditorFeedbackPayload) {
  const response = await fetch(`${API_BASE_URL}/api/editor-feedback`, {
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Feedback gönderilemedi.');
  }

  const data = (await response.json()) as { feedback: ApiFeedbackRow };
  return mapFeedbackRow(data.feedback);
}

export async function fetchEditorFeedback() {
  const response = await fetch(`${API_BASE_URL}/api/editor-feedback`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Feedback listesi alınamadı.');
  }

  const data = (await response.json()) as { feedback: ApiFeedbackRow[] };
  return data.feedback.map(mapFeedbackRow);
}

export async function updateEditorFeedbackStatus({
  id,
  status,
}: {
  id: string;
  status: EditorFeedbackStatus;
}) {
  const response = await fetch(`${API_BASE_URL}/api/editor-feedback`, {
    body: JSON.stringify({ id, status }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Feedback durumu güncellenemedi.');
  }

  const data = (await response.json()) as { feedback: ApiFeedbackRow };
  return mapFeedbackRow(data.feedback);
}

function mapFeedbackRow(row: ApiFeedbackRow): EditorFeedbackRecord {
  return {
    appRole: row.app_role,
    clinicalRole: row.clinical_role,
    commandText: row.command_text,
    contributionArea: row.contribution_area,
    createdAt: row.created_at,
    editIntent: row.edit_intent,
    feedback: row.feedback,
    id: row.id,
    moduleTitle: row.module_title,
    sourceNote: row.source_note,
    status: row.status,
    suggestedEdit: row.suggested_edit,
    userName: row.user_name,
  };
}
