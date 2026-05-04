import { WarningBox } from '../common/WarningBox';
import { SPIROMETRY_SAFETY_WARNING } from '../../utils/spirometry/gliInterpretation';

export function SpirometryQualityWarning() {
  return (
    <WarningBox
      tone="amber"
      title="Test kalitesi"
      text={SPIROMETRY_SAFETY_WARNING}
    />
  );
}
