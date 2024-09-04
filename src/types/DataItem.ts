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
  id: any;
  walkingTrailId: number;
  createdDate: string;
  name: number | null;
  time: any;
  distance: any;
  openRange: string | null;
  rating: number | null;
  memo: string;
  photos: string[];
  image: any;
}
