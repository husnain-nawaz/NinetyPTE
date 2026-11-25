import PortalAnalyticsView from '../../shared/analytics/PortalAnalyticsView';
import { ACADEMIC_ANALYTICS_DATA } from './analyticsData';

/**
 * PTE Academic Performance Progress analytics page (/v1/analytics when Academic track
 * is active).
 */
export default function AcademicAnalyticsPage() {
  return <PortalAnalyticsView key="academic-analytics" data={ACADEMIC_ANALYTICS_DATA} />;
}
