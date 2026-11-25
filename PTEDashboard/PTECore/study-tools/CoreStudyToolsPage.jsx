import { useEffect } from 'react';
import { TEMPLATE_FILES_CORE } from '../../PTEAcademic/study-tools/templatesData';
import { usePortal } from '../../shared/portalContext';
import { GRAMMAR_TOPICS } from '../../shared/study-tools/grammarData';
import StudyToolsShell from '../../shared/study-tools/StudyToolsShell';
import { PREDICTION_FILES_CORE } from './corePredictionsData';

/**
 * PTE Core Study Tools workspace (/v1/templates, /v1/prediction, /v1/grammar in Core mode).
 */
export default function CoreStudyToolsPage({ initialTab = 'grammar', syncPortalMode = false }) {
  const { setPortalMode } = usePortal();

  useEffect(() => {
    if (syncPortalMode) {
      setPortalMode('core');
    }
  }, [setPortalMode, syncPortalMode]);

  return (
    <StudyToolsShell
      initialTab={initialTab}
      templateFiles={TEMPLATE_FILES_CORE}
      predictionFiles={PREDICTION_FILES_CORE}
      grammarTopics={GRAMMAR_TOPICS}
      infoDescription="Access PTE Core Speaking & Writing templates, weekly prediction files, and downloadable grammar rule sheets inside Study Tools."
    />
  );
}
