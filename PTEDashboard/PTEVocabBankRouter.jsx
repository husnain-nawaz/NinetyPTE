import { AcademicVocabBankPage } from './PTEAcademic';
import { CoreVocabBankPage } from './PTECore';
import { usePortal } from './shared/portalContext';

/**
 * Dynamically mounts AcademicVocabBankPage or CoreVocabBankPage on /v1/vocab-bank
 * according to the active exam track in PortalContext.
 */
export default function PTEVocabBankRouter() {
  const { portalMode } = usePortal();
  return portalMode === 'core' ? <CoreVocabBankPage /> : <AcademicVocabBankPage />;
}
