import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      neutral: {
        text: string;
        textWeak: string;
        textStrong: string;
        background: string;
        backgroundWeak: string;
        backgroundBold: string;
        backgroundBlur: string;
        border: string;
        borderStrong: string;
        overlay: string;
      };
      accent: {
        text: string;
        textWeak: string;
        backgroundPrimary: string;
        backgroundSecondary: string;
      };
      system: {
        warning: string;
        background: string;
        backgroundWeak: string;
      };
      brand: {
        primary: string;
        primaryStrong: string;
      }
    };
    filter: {
      neutralTextWeak: string;
      accentText: string;
    };
    backdropFilter: {
      blur: string;
    };
    font: {
      displayStrong32: string;
      displayStrong20: string;
      displayStrong16: string;
      displayDefault16: string;
      displayDefault12: string;
      availableStrong16: string;
      availableStrong12: string;
      availableStrong10: string;
      availableDefault16: string;
      availableDefault12: string;
      enabledStrong16: string;
      enabledStrong12: string;
    };
  }
}
