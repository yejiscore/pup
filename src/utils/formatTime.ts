/* eslint-disable radix */
export const formatTime = (time: number) => {
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const formatDistance = (distance: number) => {
  return `${distance.toFixed(2).padStart(5, '0')}km`;
};

export const formatRating = (rating: string) => {
  return parseFloat(rating).toFixed(1);
};

export const formatReviewCount = (count: number) => {
  // 최소 4자리로 맞추기 위해 padStart 사용
  const formattedCount = count.toString().padStart(4, '0');
  // 천 단위 쉼표 추가
  return formattedCount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
