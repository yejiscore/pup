export interface IUserTrailLists {
  walkingTrailId: number;
  name: string;
  description: string;
  walkingTrailUid: string;
  time: number;
  distance: number;
  openRange: string;
  createdDate: string;
  rating: number;
  userId: number;
  reviewCount: number;
  likeCount: number;
  isLike: boolean;
}

export interface ResIUserTrailLists {
  data: IUserTrailLists[];
  message: string;
  status: number;
  code: number;
}
