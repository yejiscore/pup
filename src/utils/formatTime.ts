export const formatTime = (time: number) => {
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDistance = (distance: number) => {
  return `${distance.toFixed(2).padStart(5, '0')}km`;
};
