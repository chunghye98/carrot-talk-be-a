import { css } from '@emotion/react';

type Props = {
  children?: React.ReactNode;
};

export const ListBox: React.FC<Props> = ({ children }) => {
  return <ul css={listBoxStyle}>{children}</ul>;
};

const listBoxStyle = css`
  display: flex;
  box-sizing: border-box;
  width: 393px;
  padding: 0px 16px;
  flex-direction: column;
  align-items: flex-start;
`;
