// export interface DataItem {
//     id: number;
//     date: string;
//     title: string;
//     time: string;
//     distance: string;
//     visibility: string;
//     userUid: string;
//     rating: number;
//     photos: (string | File)[];
//     memo: string;
//     image?: string | File;
// }

export interface DataItem {
  walkingTrailId: number;
  createdDate: string;
  name: string | null;
  time: number;
  distance: number;
  openRange: string | null;
  rating: number | null;
  memo: string;
  photos: string[];
  image: string;
}
