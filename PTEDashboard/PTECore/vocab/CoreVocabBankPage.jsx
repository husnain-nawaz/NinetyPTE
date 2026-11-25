import { useEffect } from 'react';
import { usePortal } from '../../shared/portalContext';
import VocabBankShell from '../../shared/vocab/VocabBankShell';
import { CORE_VOCAB_DECKS } from './coreVocabData';

/**
 * PTE Core Vocab Bank view (/v1/vocab-bank in Core mode, or /v1/core/vocab-bank).
 */
export default function CoreVocabBankPage({ syncPortalMode = false }) {
  const { setPortalMode } = usePortal();

  useEffect(() => {
    if (syncPortalMode) {
      setPortalMode('core');
    }
  }, [setPortalMode, syncPortalMode]);

  return (
    <VocabBankShell
      decks={CORE_VOCAB_DECKS}
      videoGuidePath="/v1/core/youtube-videos"
    />
  );
}
