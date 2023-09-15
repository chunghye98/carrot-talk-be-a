import { css, Theme } from '@emotion/react';
import { ActionBar } from './ActionBar';

type Props = {
  children: React.ReactNode;
};

export const ChatBar: React.FC<Props> = ({ children }) => {
  return <ActionBar css={chatBarStyle}>{children}</ActionBar>;
};

const chatBarStyle = (theme: Theme) => {
  return css`
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 16px;

    div {
      flex: 1;
      padding: 0;
    }

    svg {
      width: 26px;
      height: 16px;
      stroke: ${theme.color.accent.text};
    }
  `;
};
