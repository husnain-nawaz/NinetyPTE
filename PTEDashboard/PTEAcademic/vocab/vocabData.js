import {
  SHARED_LISTENING_FIB_DECK,
  SHARED_MY_LIST_DECK,
  SHARED_READING_FIB_WORDS,
  SHARED_RW_FIB_WORDS,
  SHARED_WFD_DECK,
} from '../../shared/vocab/sharedVocabDecks';

export const VOCAB_DECKS = [
  SHARED_MY_LIST_DECK,
  {
    id: 'rw-fib-dd',
    title: 'Fill in the Blanks (Drag & Drop)',
    baseTotal: 1820,
    description: 'List of words used in : Fill in the Blanks (Drag & Drop)',
    sampleWords: SHARED_READING_FIB_WORDS,
  },
  {
    id: 'rw-fib-d',
    title: 'Fill in the Blanks (Dropdown)',
    baseTotal: 829,
    description: 'List of words used in : Fill in the Blanks (Dropdown)',
    sampleWords: SHARED_RW_FIB_WORDS,
  },
  SHARED_WFD_DECK,
  SHARED_LISTENING_FIB_DECK,
];
