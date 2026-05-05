import { CopyClinicalNoteButton } from '../common/CopyClinicalNoteButton';

export function CopySpirometrySummaryButton({ summary }: { summary: string }) {
  return <CopyClinicalNoteButton note={summary} />;
}
