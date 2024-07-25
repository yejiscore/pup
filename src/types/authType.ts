export interface UserDataType {
  code: number;
  status: string;
  data: {
    userId: number;
    email: string;
    userUid: string;
    profile: string;
    description: string;
  };
  message: string;
}
