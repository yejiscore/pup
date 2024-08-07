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

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const date = new Date(dateString);
  return date
    .toLocaleDateString('ko-KR', options)
    .replace(/\./g, '')
    .replace(/(\d{4})(\d{2})(\d{2})/, '$1. $2. $3');
}

// src/utils/calculateAge.ts
export const calculateAge = (birthDateString: string): number => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const formatDateDay = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
};
