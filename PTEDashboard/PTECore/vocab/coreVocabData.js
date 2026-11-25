import {
  SHARED_LISTENING_FIB_DECK,
  SHARED_MY_LIST_DECK,
  SHARED_READING_FIB_WORDS,
  SHARED_RW_FIB_WORDS,
  SHARED_WFD_DECK,
} from '../../shared/vocab/sharedVocabDecks';

export const CORE_VOCAB_DECKS = [
  SHARED_MY_LIST_DECK,
  {
    id: 'r-fib',
    title: 'Reading Fill in the Blanks',
    baseTotal: 1820,
    description: 'List of words used in Reading: Fill in the Blanks',
    sampleWords: SHARED_READING_FIB_WORDS,
  },
  {
    id: 'rw-fib',
    title: 'Reading & Writing: Fill in the Blanks',
    baseTotal: 2553,
    description: 'List of words used in Reading & Writing: Fill in the Blanks',
    sampleWords: SHARED_RW_FIB_WORDS,
  },
  SHARED_WFD_DECK,
  SHARED_LISTENING_FIB_DECK,
];
