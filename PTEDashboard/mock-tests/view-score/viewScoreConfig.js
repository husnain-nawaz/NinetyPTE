import { BookOpen, Headphones, Mic, Pencil } from 'lucide-react';

export const REPORT_SKILLS = [
  { key: 'Speaking', field: 'speaking', color: '#eb8c44', activeBg: 'bg-[#c96b27] text-white', badgeBg: 'bg-[#fdf1e6] text-[#c96b27]', Icon: Mic },
  { key: 'Writing', field: 'writing', color: '#4ea5f5', activeBg: 'bg-[#2563eb] text-white', badgeBg: 'bg-[#eaf2ff] text-[#2563eb]', Icon: Pencil },
  { key: 'Reading', field: 'reading', color: '#22c55e', activeBg: 'bg-[#16a34a] text-white', badgeBg: 'bg-[#e8f8ed] text-[#16a34a]', Icon: BookOpen },
  { key: 'Listening', field: 'listening', color: '#0b4a7b', activeBg: 'bg-[#0b4a7b] text-white', badgeBg: 'bg-[#e6eff8] text-[#0b4a7b]', Icon: Headphones },
];

export const SKILL_PILL_COLOR = {
  S: 'bg-[#f49d56] text-white',
  W: 'bg-[#4ea5f5] text-white',
  R: 'bg-[#22c55e] text-white',
  L: 'bg-[#0b4a7b] text-white',
};
