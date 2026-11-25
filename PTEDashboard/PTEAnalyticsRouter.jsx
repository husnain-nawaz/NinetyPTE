import { AcademicAnalyticsPage } from './PTEAcademic';
import { CoreAnalyticsPage } from './PTECore';
import { usePortal } from './shared/portalContext';

/**
 * Dynamically mounts AcademicAnalyticsPage or CoreAnalyticsPage on /v1/analytics
 * according to the active portal track in PortalContext.
 */
export default function PTEAnalyticsRouter() {
  const { portalMode } = usePortal();
  return portalMode === 'core' ? <CoreAnalyticsPage /> : <AcademicAnalyticsPage />;
}
