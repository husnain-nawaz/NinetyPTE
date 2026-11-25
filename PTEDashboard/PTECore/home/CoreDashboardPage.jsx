import { useEffect } from 'react';
import DashboardHomeShell from '../../shared/home/DashboardHomeShell';
import { usePortal } from '../../shared/portalContext';
import { CORE_HOME_DATA } from './coreHomeData';

/**
 * NinetyPTE PTE Core Student Portal Home Page (/v1/core/dashboard, /core-dashboard,
 * or /dashboard when PTE Core is selected in the header track switcher).
 */
export default function CoreDashboardPage() {
  const { setPortalMode } = usePortal();

  useEffect(() => {
    setPortalMode('core');
  }, [setPortalMode]);

  return <DashboardHomeShell key="core" data={CORE_HOME_DATA} showExpiryToast={false} />;
}
