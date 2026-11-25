import { useEffect } from 'react';
import PortalAnalyticsView from '../../shared/analytics/PortalAnalyticsView';
import { usePortal } from '../../shared/portalContext';
import { CORE_ANALYTICS_DATA } from './coreAnalyticsData';

/**
 * PTE Core Performance Progress analytics page (/v1/analytics when PTE Core track
 * is active, or /v1/core/analytics directly).
 */
export default function CoreAnalyticsPage() {
  const { setPortalMode } = usePortal();

  useEffect(() => {
    setPortalMode('core');
  }, [setPortalMode]);

  return <PortalAnalyticsView key="core-analytics" data={CORE_ANALYTICS_DATA} />;
}
