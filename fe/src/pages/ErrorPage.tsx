import { Theme, css } from '@emotion/react';

type Props = {
  message: string;
};

export const ErrorPage: React.FC<Props> = ({ message }) => {
  return (
    <div css={pageStyle}>
      error...: {message}
      {`༼ つ ◕_◕ ༽つ`}
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
