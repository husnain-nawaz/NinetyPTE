export const ANALYTICS_SKILL_COLORS = {
  Speaking: '#eb8c44',
  Writing: '#5ba4f5',
  Reading: '#36c959',
  Listening: '#12487a',
};

const pad2 = (n) => String(n).padStart(2, '0');

export const formatMinutesSeconds = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${pad2(mins)}:${pad2(secs)}`;
};
