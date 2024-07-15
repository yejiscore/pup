import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      offGray: string;
      black: string;
      darkGray: string;
      background: string;
      extra: string;
      hot: string;
      blue: string;
      kakaoYellow: string;
      naverGreen: string;
      googleRed: string;
      googleYellow: string;
      googleGreen: string;
      googleBlue: string;
      primary: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
      };
    };
  }
}
