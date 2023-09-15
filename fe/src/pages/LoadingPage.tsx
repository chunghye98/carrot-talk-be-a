import { Theme, css } from '@emotion/react';

export const LoadingPage: React.FC = () => {
  return (
    <div css={pageStyle}>
      Loading...
      {`( •̀ ω •́ )✧`}
    </div>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    background-color: ${theme.color.neutral.backgroundBold};
    width: 100%;
    height: 100%;
  `;
};
