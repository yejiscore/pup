export interface IGetUserTrailType {
  code: number;
  status: string;
  data: {
    walkingTrailId: number;
    mainImage: any;
    name: string;
    description: string;
    walkingTrailUid: string;
    time: number;
    distance: number;
    openRange: any;
    createdDate: string;
    rating: number;
    userId: number;
    reviewCount: number;
    likeCount: number;
    isLike: boolean;
    itemList: {
      walkingTrailItemId: number;
      lat: number;
      lng: number;
    }[];
    imageList: string[];
  };
  message: string;
}
