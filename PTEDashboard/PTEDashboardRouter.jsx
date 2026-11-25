import { AcademicDashboardPage } from './PTEAcademic';
import { CoreDashboardPage } from './PTECore';
import { usePortal } from './shared/portalContext';

/**
 * Dynamically mounts either PTEAcademic Home or PTECore Home on /dashboard routes
 * according to the active exam switcher selection.
 */
export default function PTEDashboardRouter() {
  const { portalMode } = usePortal();
  return portalMode === 'core' ? <CoreDashboardPage /> : <AcademicDashboardPage />;
}
