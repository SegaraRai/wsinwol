const minDiff = -5 as const;
const maxDiff = 10 as const;


export function getTime(): number {
  return Math.floor(Date.now() / 1000);
}


export function isValidTime(time: number, baseTime = getTime()): boolean {
  const diff = time - baseTime;
  return minDiff <= diff && diff <= maxDiff;
}
