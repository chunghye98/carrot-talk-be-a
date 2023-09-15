import { Theme, css, keyframes } from '@emotion/react';
import { ImageBox } from '../imageBox/ImageBox';

export const SkeletonListItem: React.FC = () => {
  return (
    <li css={listItemStyle}>
      <ImageBox size="l" />
      <div className="text-area">
        <div className="text-area__information">
          <div className="text-area__information-title"></div>
          <div className="text-area__information-location"></div>
          <div className="text-area__information-state"></div>
        </div>
      </div>
    </li>
  );
};

const listItemStyle = (theme: Theme) => {
  return css`
    box-sizing: border-box;
    display: flex;
    padding: 16px 0px;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
    > * {
      animation: ${fadeInOut} 1.5s ease-in-out 0.5s infinite;
    }
    .text-area {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      flex: 1 0 0;
      align-self: stretch;

      &__information {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        div {
          border-radius: 4px;

          background-color: ${theme.color.neutral.backgroundBold};
        }

        &-title {
          display: flex;
          min-height: 24px;
          max-height: 48px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 4px;
          align-self: stretch;
        }

        &-location {
          width: 100%;
          height: 16px;
        }

        &-state {
          display: flex;
          align-items: center;
          gap: 4px;
          width: 50%;
          height: 16px;
        }
      }
    }

    border-bottom: 0.8px solid ${theme.color.neutral.border};
  `;
};

const fadeInOut = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.4;
}
100% {
  opacity: 1;
}
`;
