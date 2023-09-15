import { Theme, css } from '@emotion/react';
import { FC } from 'react';
type Props = {
  children: React.ReactNode;
};

export const AlertContent: FC<Props> = ({ children }) => {
  return <div css={alertContentStyle}>{children}</div>;
};

const alertContentStyle = (theme: Theme) => {
  return css`
    display: flex;
    padding: 24px 32px;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    align-self: stretch;

    font: ${theme.font.displayStrong16};
    color: ${theme.color.neutral.textStrong};
  `;
};
