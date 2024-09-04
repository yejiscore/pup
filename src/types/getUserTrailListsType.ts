export interface IUserTrailLists {
  walkingTrailId: number;
  mainImage: string | null;
  name: string;
  description: string;
  walkingTrailUid: string;
  time: number;
  distance: number;
  openRange: string;
  createdDate: string;
  rating: number;
  userId: number;
  userUid: string;
  reviewCount: number;
  likeCount: number;
  isLike: boolean;
  itemList: { walkingTrailItemId: number; lat: number; lng: number }[];
}

export interface ResIUserTrailLists {
  data: IUserTrailLists[];
  message: string;
  status: number;
  code: number;
}
