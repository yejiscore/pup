export interface DataItem {
  id: number;
  date: string;
  title: string;
  time: string;
  distance: string;
  visibility: string;
  userUid: string;
  rating: number;
  photos: (string | File)[];
  memo: string;
  image?: string | File;
}
