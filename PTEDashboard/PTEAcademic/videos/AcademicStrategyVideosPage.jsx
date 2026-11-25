import StrategyVideosShell from '../../shared/videos/StrategyVideosShell';
import { STRATEGY_VIDEOS_BY_PAGE } from './videosData';

/**
 * PTE Academic Strategy Videos / PTE Video Guide library (/v1/youtube-videos/:page).
 */
export default function AcademicStrategyVideosPage() {
  return (
    <StrategyVideosShell
      tutorialHeading="PTE Academic Tutorials"
      videosByPage={STRATEGY_VIDEOS_BY_PAGE}
      totalPages={2}
      paginationBasePath="/v1/youtube-videos"
      practicePath="/v1/practice/speaking/read-aloud"
      showBackButton
      backTo="/dashboard"
    />
  );
}
