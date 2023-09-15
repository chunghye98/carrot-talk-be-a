import { Global, ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import designSystem from '@styles/designSystem';
import { globalStyle } from '@styles/globalStyle';

export const decorators = [
  (Story: any) => (
    <ThemeProvider theme={designSystem}>
      <Global styles={globalStyle} />
      <Story />
    </ThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
