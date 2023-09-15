import { Theme, css } from '@emotion/react';
import { ActionBar } from './ActionBar';

type Props = {
  children: React.ReactNode;
  isLiked: boolean;
};

export const PostBar: React.FC<Props> = ({ children, isLiked }) => {
  return (
    <ActionBar css={(theme) => postBarStyle(theme, isLiked)}>
      {children}
    </ActionBar>
  );
};

const postBarStyle = (theme: Theme, isLiked: boolean) => {
  return css`
    justify-content: space-between;
    padding: 16px;
    font: ${theme.font.displayDefault16};
    color: ${theme.color.neutral.textStrong};

    svg {
      fill: ${isLiked ? theme.color.system.warning : 'none'};
      stroke: ${isLiked
        ? theme.color.system.warning
        : theme.color.neutral.textStrong};
    }
  `;
};
