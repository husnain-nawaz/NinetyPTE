import DashboardHomeShell from '../../shared/home/DashboardHomeShell';
import { ACADEMIC_HOME_DATA } from './homeData';

/**
 * NinetyPTE PTE Academic Student Portal Home Page (/dashboard, /v1/dashboard).
 */
export default function AcademicDashboardPage() {
  return <DashboardHomeShell key="academic" data={ACADEMIC_HOME_DATA} showExpiryToast />;
}
