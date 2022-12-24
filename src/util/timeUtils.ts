export function formatTimer(time: number) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return `${minutes} min(s) ${seconds} sec(s)`;
}
