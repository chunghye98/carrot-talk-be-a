import { css } from '@emotion/react';
import { ActionBar } from './ActionBar';

type Props = {
  children: React.ReactNode;
};

export const EditBar: React.FC<Props> = ({ children }) => {
  return <ActionBar css={editBarStyle}>{children}</ActionBar>;
};

const editBarStyle = css`
  justify-content: flex-start;
  gap: 8px;
  padding: 0 16px;
`;
