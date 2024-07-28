interface Kakao {
  init(key: string): void;
  isInitialized(): boolean;
  Auth: {
    login(params: {
      success: (authObj: any) => void;
      fail: (err: any) => void;
    }): void;
  };
}

interface Window {
  Kakao: Kakao;
}
