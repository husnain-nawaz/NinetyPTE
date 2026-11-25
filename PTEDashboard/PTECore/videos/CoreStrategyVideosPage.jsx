import { useEffect } from 'react';
import { usePortal } from '../../shared/portalContext';
import StrategyVideosShell from '../../shared/videos/StrategyVideosShell';
import { CORE_STRATEGY_VIDEOS_BY_PAGE } from './coreVideosData';

/**
 * PTE Core Tutorials / PTE Video Guide page (/v1/core/youtube-videos, or /v1/youtube-videos/* in Core mode).
 */
export default function CoreStrategyVideosPage({ syncPortalMode = false }) {
  const { setPortalMode } = usePortal();

  useEffect(() => {
    if (syncPortalMode) {
      setPortalMode('core');
    }
  }, [setPortalMode, syncPortalMode]);

  return (
    <StrategyVideosShell
      tutorialHeading="PTE Core Tutorials"
      videosByPage={CORE_STRATEGY_VIDEOS_BY_PAGE}
      totalPages={1}
      practicePath="/pte-core-speaking-practice"
      showBackButton={false}
    />
  );
}
