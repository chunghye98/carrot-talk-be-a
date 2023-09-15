import { css } from '@emotion/react';
import { NavBar } from '@components/common/navBar/NavBar';
import { Outlet } from 'react-router-dom';
import { useAnimation } from '@/hooks/useAnimation';
import { useLayoutStore } from '@/stores/layoutStore';

export const Layout: React.FC = () => {
  const { shouldSlideLeft } = useLayoutStore();
  const { handleTransitionEnd, animationTrigger } =
    useAnimation(shouldSlideLeft);

  return (
    <div
      css={() => layoutStyle(animationTrigger)}
      onTransitionEnd={handleTransitionEnd}
    >
      <Outlet />
      <NavBar />
    </div>
  );
};

const layoutStyle = (animationTrigger: boolean) => {
  return css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    transition: 300ms ease;
    transform: translateX(${animationTrigger ? '-392px' : '0px'});
  `;
};
