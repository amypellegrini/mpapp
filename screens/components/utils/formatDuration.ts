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
    duration += `${time.hours} hour${time.hours > 1 ? 's' : ''} `;
  }

  if (time.minutes) {
    duration += `${time.minutes} minute${time.minutes > 1 ? 's' : ''} `;
  }

  if (time.minutes && time.seconds) {
    duration += 'and ';
  }

  if (time.seconds) {
    duration += `${time.seconds} second${time.seconds > 1 ? 's' : ''}`;
  }

  return duration.trim();
}

export default formatDuration;
