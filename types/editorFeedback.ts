export type EditorFeedbackStatus = 'pending' | 'accepted' | 'rejected' | 'done';

export type EditorFeedbackPayload = {
  moduleTitle: string;
  userName: string;
  appRole: string;
  clinicalRole: string;
  contributionArea: string;
  editIntent: string;
  feedback: string;
  suggestedEdit: string;
  sourceNote: string;
  commandText: string;
};

export type EditorFeedbackRecord = EditorFeedbackPayload & {
  id: string;
  createdAt: string;
  status: EditorFeedbackStatus;
};
