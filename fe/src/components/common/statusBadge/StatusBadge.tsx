import { Theme, css } from '@emotion/react';

type Props = {
  state: string;
};

export const StatusBadge: React.FC<Props> = ({ state }) => {
  return <div css={statusBadgeStyle}>{state}</div>;
};

// TODO state 따라 배경색이 달라야하는지..?
const statusBadgeStyle = (theme: Theme) => {
  return css`
    display: flex;
    height: 22px;
    padding: 0 8px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background-color: ${theme.color.accent.backgroundSecondary};
    font: ${theme.font.displayDefault12};
    color: ${theme.color.accent.text};
  `;
};
