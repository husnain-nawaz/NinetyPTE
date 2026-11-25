import { AcademicStrategyVideosPage } from './PTEAcademic';
import { CoreStrategyVideosPage } from './PTECore';
import { usePortal } from './shared/portalContext';

/**
 * Dynamically mounts AcademicStrategyVideosPage or CoreStrategyVideosPage on
 * /v1/youtube-videos/:page according to the active exam track in PortalContext.
 */
export default function PTEStrategyVideosRouter() {
  const { portalMode } = usePortal();
  return portalMode === 'core' ? <CoreStrategyVideosPage /> : <AcademicStrategyVideosPage />;
}
