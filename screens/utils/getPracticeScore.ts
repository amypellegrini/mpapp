export default function getPracticeScore(
  lastUpdated: Date,
  totalDuration: number,
): number {
  const significantDigits = totalDuration.toString().length;
  const dateFactor = parseInt(
    lastUpdated.getTime().toString().slice(-significantDigits),
  );
  return dateFactor + totalDuration;
}
