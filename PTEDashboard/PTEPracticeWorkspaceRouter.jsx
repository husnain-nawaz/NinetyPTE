import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePortal } from './shared/portalContext';
import PracticeArenaShell from './practice-arena';

/**
 * Routes /v1/practice/:skill/:taskSlug and /v1/core/practice/:skill/:taskSlug
 * to PracticeArenaShell using the active exam track catalog.
 */
export default function PTEPracticeWorkspaceRouter({ syncCoreMode = false }) {
  const { skill, taskSlug } = useParams();
  const { portalMode, setPortalMode } = usePortal();

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [setPortalMode, syncCoreMode]);

  const isCoreMode = syncCoreMode || portalMode === 'core';

  return (
    <PracticeArenaShell
      key={`${isCoreMode ? 'core' : 'acad'}-${skill}-${taskSlug}`}
      skill={skill}
      taskSlug={taskSlug}
      isCoreMode={isCoreMode}
    />
  );
}
