import { Theme, css } from '@emotion/react';
import { Dim } from './Dim';
import { useAnimation } from '@/hooks/useAnimation';

type Props = {
  isOpen: boolean;
  currentDim: PopupType | null;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, currentDim, children }) => {
  const { shouldRender, handleTransitionEnd, animationTrigger } =
    useAnimation(isOpen);

  return (
    <>
      {shouldRender && (
        <div css={(theme) => modalStyle(theme, animationTrigger)}>
          <Dim isOpen={currentDim === 'modal'} />
          <div className="modal" onTransitionEnd={handleTransitionEnd}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const modalStyle = (theme: Theme, animationTrigger: boolean) => {
  return css`
    height: 100vh;
    display: flex;
    width: 393px;
    position: absolute;
    inset: 0;

    z-index: 105;
    justify-content: center;
    align-items: center;

    .modal {
      position: relative;
      z-index: 110;
      display: flex;
      width: 320px;
      height: 852px;
      box-sizing: border-box;
      flex-direction: column;
      align-items: flex-start;
      flex-shrink: 0;
      border-radius: 16px;
      background-color: ${theme.color.neutral.background};
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

      ${animationTrigger ? '' : 'transform: translateY(1rem); opacity: 0;'};

      transition: 300ms ease;
    }

    ul {
      display: flex;
      padding: 0px 24px;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    li:not(:last-child) {
      border-bottom: 1px solid ${theme.color.neutral.border};
    }
  `;
};
