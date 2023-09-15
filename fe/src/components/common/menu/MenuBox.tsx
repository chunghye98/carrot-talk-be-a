import { Theme, css } from '@emotion/react';

export type MenuBoxProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export const MenuBox: React.FC<MenuBoxProps> = ({ children, onClick }) => {
  return <ul css={(theme) => menuItemStyle(theme)} onClick={onClick}>{children}</ul>;
};

const menuItemStyle = (theme: Theme) => css`
  display: flex;
  width: 240px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px ${theme.color.neutral.overlay};

  & > li {
    &:first-of-type {
      border-radius: 16px 16px 0px 0px;
    }

    &:last-of-type {
      border-radius: 0px 0px 16px 16px;
    }

    &:not(:last-of-type) {
      border-bottom: 0.8px solid ${theme.color.neutral.border};
    }
  }
`;
