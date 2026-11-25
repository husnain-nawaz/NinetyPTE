import { GRAMMAR_TOPICS } from '../../shared/study-tools/grammarData';
import StudyToolsShell from '../../shared/study-tools/StudyToolsShell';
import { PREDICTION_FILES_ACADEMIC } from './predictionsData';
import { TEMPLATE_FILES_ACADEMIC } from './templatesData';

/**
 * PTE Academic Study Tools tabbed workspace (/v1/templates, /v1/prediction, /v1/grammar).
 */
export default function AcademicStudyToolsPage({ initialTab = 'grammar' }) {
  return (
    <StudyToolsShell
      initialTab={initialTab}
      templateFiles={TEMPLATE_FILES_ACADEMIC}
      predictionFiles={PREDICTION_FILES_ACADEMIC}
      grammarTopics={GRAMMAR_TOPICS}
      infoDescription="Access PTE Academic Speaking & Writing templates, weekly prediction files, and downloadable grammar rule sheets inside Study Tools."
    />
  );
}
