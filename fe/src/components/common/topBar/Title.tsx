import { Theme, css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

export const Title: React.FC<Props> = ({ children }) => {
  return <h2 css={titleStyle}>{children}</h2>;
};

const titleStyle = (theme: Theme) => {
  return css`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.color.neutral.textStrong};
    font: ${theme.font.displayStrong16};
  `;
};
