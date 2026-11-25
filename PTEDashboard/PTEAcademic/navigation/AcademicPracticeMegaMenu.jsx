import { BookOpen, Headphones, Mic, PenLine } from 'lucide-react';
import PracticeMegaMenuShell from '../../shared/navigation/PracticeMegaMenuShell';

const ACADEMIC_STUDY_TOOLS = [
  { label: 'Templates', to: '/v1/templates' },
  { label: 'Predictions', to: '/v1/prediction' },
  { label: 'Grammar', to: '/v1/grammar' },
  { label: 'Vocab Bank', to: '/v1/vocab-bank' },
  { label: 'Strategy Videos', to: '/v1/youtube-videos/1' },
  { label: 'Practice History', to: '/v1/practice-history' },
  { label: 'Question Weightage', to: '/v1/question-weightage' },
];

const ACADEMIC_PRACTICE_COLUMNS = [
  {
    title: 'Speaking',
    Icon: Mic,
    items: [
      { name: 'Read Aloud', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '9%', color: 'Speaking' }] },
      { name: 'Repeat Sentence', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '16%', color: 'Speaking' }, { pct: '17%', color: 'Listening' }] },
      { name: 'Describe Image', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '31%', color: 'Speaking' }] },
      { name: 'Re-Tell Lecture', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '13%', color: 'Speaking' }, { pct: '13%', color: 'Listening' }] },
      { name: 'Answer Short Question', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '4%', color: 'Listening' }] },
      { name: 'Summarize Group Discussion', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '19%', color: 'Speaking' }, { pct: '20%', color: 'Listening' }] },
      { name: 'Respond to a Situation', to: '/pte-speaking-practice', ai: true, weights: [{ pct: '13%', color: 'Speaking' }] },
    ],
  },
  {
    title: 'Writing',
    Icon: PenLine,
    items: [
      { name: 'Summarize Written Text', to: '/pte-writing-practice', ai: true, weights: [{ pct: '23%', color: 'Reading' }, { pct: '28%', color: 'Writing' }] },
      { name: 'Write Essay', to: '/pte-writing-practice', ai: true, weights: [{ pct: '31%', color: 'Writing' }] },
    ],
  },
  {
    title: 'Reading',
    Icon: BookOpen,
    items: [
      { name: 'Fill in the Blanks (Dropdown)', to: '/pte-reading-practice', ai: false, weights: [{ pct: '25%', color: 'Reading' }] },
      { name: 'Multiple Choice, Multiple Answers', to: '/pte-reading-practice', ai: false, weights: [{ pct: '5%', color: 'Reading' }] },
      { name: 'Re-order Paragraphs', to: '/pte-reading-practice', ai: false, weights: [{ pct: '9%', color: 'Reading' }] },
      { name: 'Fill in the Blanks (Drag & Drop)', to: '/pte-reading-practice', ai: false, weights: [{ pct: '20%', color: 'Reading' }] },
      { name: 'Multiple Choice, Single Answer', to: '/pte-reading-practice', ai: false, weights: [{ pct: '3%', color: 'Reading' }] },
    ],
  },
  {
    title: 'Listening',
    Icon: Headphones,
    items: [
      { name: 'Summarize Spoken Text', to: '/pte-listening-practice', ai: true, weights: [{ pct: '10%', color: 'Listening' }, { pct: '18%', color: 'Writing' }] },
      { name: 'Multiple Choice, Multiple Answers', to: '/pte-listening-practice', ai: false, weights: [{ pct: '3%', color: 'Listening' }] },
      { name: 'Fill in the Blanks', to: '/pte-listening-practice', ai: false, weights: [{ pct: '8%', color: 'Listening' }] },
      { name: 'Highlight Correct Summary', to: '/pte-listening-practice', ai: false, weights: [{ pct: '2%', color: 'Reading' }, { pct: '3%', color: 'Listening' }] },
      { name: 'Multiple Choice, Single Answer', to: '/pte-listening-practice', ai: false, weights: [{ pct: '2%', color: 'Listening' }] },
      { name: 'Select Missing Word', to: '/pte-listening-practice', ai: false, weights: [{ pct: '1%', color: 'Listening' }] },
      { name: 'Highlight Incorrect Words', to: '/pte-listening-practice', ai: false, weights: [{ pct: '8%', color: 'Reading' }, { pct: '13%', color: 'Listening' }] },
      { name: 'Write from Dictation', to: '/pte-listening-practice', ai: true, weights: [{ pct: '13%', color: 'Listening' }, { pct: '23%', color: 'Writing' }] },
    ],
  },
];

/**
 * Full-width Practice Mega Menu for PTE Academic / UKVI tasks and Study Tools.
 */
export default function AcademicPracticeMegaMenu({ onClose }) {
  return (
    <PracticeMegaMenuShell
      columns={ACADEMIC_PRACTICE_COLUMNS}
      studyToolLinks={ACADEMIC_STUDY_TOOLS}
      showLegend
      onClose={onClose}
    />
  );
}
