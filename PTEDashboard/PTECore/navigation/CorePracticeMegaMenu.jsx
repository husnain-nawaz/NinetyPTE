import { BookOpen, Headphones, Mic, PenLine } from 'lucide-react';
import PracticeMegaMenuShell from '../../shared/navigation/PracticeMegaMenuShell';

const CORE_STUDY_TOOLS = [
  { label: 'Templates', to: '/v1/core/templates' },
  { label: 'Predictions', to: '/v1/core/prediction' },
  { label: 'Grammar', to: '/v1/core/grammar' },
  { label: 'Vocab Bank', to: '/v1/core/vocab-bank' },
  { label: 'Strategy Videos', to: '/v1/core/youtube-videos' },
  { label: 'Practice History', to: '/v1/practice-history' },
  { label: 'Exam Pattern', to: '/v1/core/exam-pattern' },
];

const CORE_PRACTICE_COLUMNS = [
  {
    title: 'Speaking',
    Icon: Mic,
    items: [
      { name: 'Read Aloud', to: '/v1/core/practice/speaking/read-aloud', ai: true },
      { name: 'Repeat Sentence', to: '/v1/core/practice/speaking/repeat-sentence', ai: true },
      { name: 'Describe Image', to: '/v1/core/practice/speaking/describe-image', ai: true },
      { name: 'Respond to a Situation', to: '/v1/core/practice/speaking/respond-to-a-situation', ai: true },
      { name: 'Answer Short Question', to: '/v1/core/practice/speaking/answer-short-question', ai: true },
    ],
  },
  {
    title: 'Writing',
    Icon: PenLine,
    items: [
      { name: 'Summarize Written Text', to: '/v1/core/practice/writing/summarize-written-text', ai: true },
      { name: 'Write Email', to: '/v1/core/practice/writing/write-email', ai: true },
    ],
  },
  {
    title: 'Reading',
    Icon: BookOpen,
    items: [
      { name: 'Reading & Writing: Fill in the Blanks', to: '/v1/core/practice/reading/reading-writing-fill-in-the-blanks', ai: false },
      { name: 'Multiple Choice, Multiple Answers', to: '/v1/core/practice/reading/multiple-choice-multiple', ai: false },
      { name: 'Re-order Paragraphs', to: '/v1/core/practice/reading/reorder-paragraphs', ai: false },
      { name: 'Reading: Fill in the Blanks', to: '/v1/core/practice/reading/fill-in-the-blanks', ai: false },
      { name: 'Multiple Choice, Single Answer', to: '/v1/core/practice/reading/multiple-choice-single', ai: false },
    ],
  },
  {
    title: 'Listening',
    Icon: Headphones,
    items: [
      { name: 'Summarize Spoken Text', to: '/v1/core/practice/listening/summarize-spoken-text', ai: true },
      { name: 'Multiple Choice, Multiple Answers', to: '/v1/core/practice/listening/multiple-choice-multiple', ai: false },
      { name: 'Fill in the Blanks', to: '/v1/core/practice/listening/fill-in-the-blanks', ai: false },
      { name: 'Multiple Choice, Single Answer', to: '/v1/core/practice/listening/multiple-choice-single', ai: false },
      { name: 'Select Missing Word', to: '/v1/core/practice/listening/select-missing-word', ai: false },
      { name: 'Highlight Incorrect Words', to: '/v1/core/practice/listening/highlight-incorrect-words', ai: false },
      { name: 'Write from Dictation', to: '/v1/core/practice/listening/write-from-dictation', ai: true },
    ],
  },
];

/**
 * Full-width Practice Mega Menu dedicated to PTE Core tasks and Study Tools.
 */
export default function CorePracticeMegaMenu({ onClose }) {
  return (
    <PracticeMegaMenuShell
      columns={CORE_PRACTICE_COLUMNS}
      studyToolLinks={CORE_STUDY_TOOLS}
      showLegend={false}
      onClose={onClose}
    />
  );
}
