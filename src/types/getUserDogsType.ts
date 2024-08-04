interface getUserDogsType {
  code: number;
  status: string;
  data: {
    dogId: number;
    name: string;
    birth: string;
    isNeutered: boolean;
    profile: string;
  }[];
  message: string;
}

export default getUserDogsType;
