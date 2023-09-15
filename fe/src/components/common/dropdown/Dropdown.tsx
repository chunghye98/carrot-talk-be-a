import { ButtonProps } from '@components/common/button/Button';
import { css } from '@emotion/react';
import { cloneElement, useState } from 'react';
import { MenuBoxProps } from '../menu/MenuBox';
import { Backdrop } from './Backdrop';

type Props = {
  opener: React.ReactElement<ButtonProps>;
  menu: React.ReactElement<MenuBoxProps>;
  align?: 'left' | 'right';
};

export const Dropdown: React.FC<Props> = ({
  opener,
  menu,
  align,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'hidden';
    setIsOpen(true);
  };

  const closeMenu = () => {
    const appLayout = document.getElementById('app-layout') as HTMLElement;
    appLayout.style.overflowY = 'auto';
    setIsOpen(false);
  };

  return (
    <div css={() => dropdownStyle(align)}>
      <div onClick={openMenu}>{opener}</div>
      {isOpen && (
        <>
          <Backdrop onClick={closeMenu} />
          {cloneElement(menu, { onClick: closeMenu })}
        </>
      )}
    </div>
  );
};

const dropdownStyle = (align?: 'left' | 'right') => css`
  position: relative;

  & ul {
    position: absolute;
    ${align ?? 'left'}: 0;
  }
`;
