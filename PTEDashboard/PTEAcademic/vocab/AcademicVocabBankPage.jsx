import VocabBankShell from '../../shared/vocab/VocabBankShell';
import { VOCAB_DECKS } from './vocabData';

/**
 * PTE Academic Vocab Bank page (/v1/vocab-bank, /vocab-bank).
 */
export default function AcademicVocabBankPage() {
  return (
    <VocabBankShell
      decks={VOCAB_DECKS}
      videoGuidePath="/v1/youtube-videos/1"
    />
  );
}
