export interface Datum {
  friendId: number;
  userId: number;
  userUid: string;
  description: string;
  profile: string;
  lastWakingDate: any;
  dogProfileList: string[];
}

export interface IFriendListType {
  code: number;
  status: string;
  data: Datum[];
  message: string;
}
