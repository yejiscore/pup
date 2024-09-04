export interface DogType {
  dogId: number;
  name: string;
  profile: string;
  birth: string;
  isNeutered: boolean;
}

export interface ResDogType {
  code: number;
  status: string;
  data: DogType[];
  message: string;
}
