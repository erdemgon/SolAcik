import { CopyClinicalNoteButton } from '../common/CopyClinicalNoteButton';

export function CopyEligibilitySummaryButton({ text }: { text: string }) {
  return <CopyClinicalNoteButton note={text} />;
}
