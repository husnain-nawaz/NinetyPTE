import { AcademicStudyToolsPage } from './PTEAcademic';
import { CoreStudyToolsPage } from './PTECore';
import { usePortal } from './shared/portalContext';

/**
 * Dynamically mounts AcademicStudyToolsPage or CoreStudyToolsPage on
 * /v1/grammar, /v1/prediction, and /v1/templates according to active PortalContext mode.
 */
export default function PTEStudyToolsRouter({ initialTab = 'grammar' }) {
  const { portalMode } = usePortal();
  return portalMode === 'core' ? (
    <CoreStudyToolsPage initialTab={initialTab} />
  ) : (
    <AcademicStudyToolsPage initialTab={initialTab} />
  );
}
