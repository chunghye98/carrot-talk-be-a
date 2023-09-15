import { css } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

export const RightButton: React.FC<Props> = ({ children }) => {
  return <div css={rightButtonStyle}>{children}</div>;
};

const rightButtonStyle = css`
  position: absolute;
  right: 0;
  flex-basis: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
