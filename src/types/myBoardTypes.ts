interface IWalkListItemType {
  walkingTrailItemId: number;
  lat: number;
  lng: number;
}

export interface IWalkListType {
  walkingTrailId: number;
  mainImage: string | null;
  name: string;
  description: string;
  walkingTrailUid: string;
  time: number;
  distance: number;
  openRange: string;
  createdDate: string;
  rating: number | null;
  userId: number;
  userUid: string;
  reviewCount: number;
  likeCount: number;
  isLike: boolean;
  itemList: IWalkListItemType[];
}

export interface ResMyBoardType {
  code: number;
  status: string;
  data: IWalkListType[];
  message: string;
}
