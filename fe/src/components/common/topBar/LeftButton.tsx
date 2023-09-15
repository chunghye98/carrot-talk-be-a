import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

export const LeftButton: React.FC<Props> = ({ children }) => {
  return <div css={leftButtonStyle}>{children}</div>;
};

const leftButtonStyle = css`
  position: absolute;
  left: 0;
  flex-basis: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
