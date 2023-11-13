function formatDuration(seconds: number): string {
  if (seconds === 0) {
    return '0s';
  }

  const time = {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };

  let duration = '';

  if (time.hours) {
    duration += `${time.hours}h `;
  }

  if (time.minutes) {
    duration += `${time.minutes}m `;
  }

  if (time.seconds) {
    duration += `${time.seconds}s`;
  }

  return duration.trim();
}

export default formatDuration;
