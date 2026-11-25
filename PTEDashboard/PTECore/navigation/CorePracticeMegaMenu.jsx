import { BookOpen, Headphones, Mic, PenLine } from 'lucide-react';
import PracticeMegaMenuShell from '../../shared/navigation/PracticeMegaMenuShell';

const CORE_STUDY_TOOLS = [
  { label: 'Templates', to: '/v1/templates' },
  { label: 'Predictions', to: '/v1/prediction' },
  { label: 'Grammar', to: '/v1/grammar' },
  { label: 'Vocab Bank', to: '/v1/vocab-bank' },
  { label: 'Strategy Videos', to: '/v1/core/youtube-videos' },
  { label: 'Practice History', to: '/v1/practice-history' },
  { label: 'Exam Pattern', to: '/v1/exam-pattern' },
];

const CORE_PRACTICE_COLUMNS = [
  {
    title: 'Speaking',
    Icon: Mic,
    items: [
      { name: 'Read Aloud', to: '/pte-core-speaking-practice', ai: true },
      { name: 'Repeat Sentence', to: '/pte-core-speaking-practice', ai: true },
      { name: 'Describe Image', to: '/pte-core-speaking-practice', ai: true },
      { name: 'Respond to a Situation', to: '/pte-core-speaking-practice', ai: true },
      { name: 'Answer Short Question', to: '/pte-core-speaking-practice', ai: true },
    ],
  },
  {
    title: 'Writing',
    Icon: PenLine,
    items: [
      { name: 'Summarize Written Text', to: '/pte-core-writing-practice', ai: true },
      { name: 'Write Email', to: '/pte-core-writing-practice', ai: true },
    ],
  },
  {
    title: 'Reading',
    Icon: BookOpen,
    items: [
      { name: 'Reading & Writing: Fill in the Blanks', to: '/pte-core-reading-practice', ai: false },
      { name: 'Multiple Choice, Multiple Answers', to: '/pte-core-reading-practice', ai: false },
      { name: 'Re-order Paragraphs', to: '/pte-core-reading-practice', ai: false },
      { name: 'Reading: Fill in the Blanks', to: '/pte-core-reading-practice', ai: false },
      { name: 'Multiple Choice, Single Answer', to: '/pte-core-reading-practice', ai: false },
    ],
  },
  {
    title: 'Listening',
    Icon: Headphones,
    items: [
      { name: 'Summarize Spoken Text', to: '/pte-core-listening-practice', ai: true },
      { name: 'Multiple Choice, Multiple Answers', to: '/pte-core-listening-practice', ai: false },
      { name: 'Fill in the Blanks', to: '/pte-core-listening-practice', ai: false },
      { name: 'Multiple Choice, Single Answer', to: '/pte-core-listening-practice', ai: false },
      { name: 'Select Missing Word', to: '/pte-core-listening-practice', ai: false },
      { name: 'Highlight Incorrect Words', to: '/pte-core-listening-practice', ai: false },
      { name: 'Write from Dictation', to: '/pte-core-listening-practice', ai: true },
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
