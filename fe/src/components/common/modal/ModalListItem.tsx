import { Theme, css } from '@emotion/react';

type Props = {
  name: string;
  onClick: () => void;
};

export const ModalListItem: React.FC<Props> = ({ name, onClick }) => {
  return (
    <li onClick={onClick} css={modalListItemStyle}>
      <span>{name}</span>
    </li>
  );
};

const modalListItemStyle = (theme: Theme) => {
  return css`
    display: flex;
    padding: 16px 0px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    font: ${theme.font.availableDefault16};
    color: ${theme.color.neutral.text};

    &:active {
      font: ${theme.font.enabledStrong16};
      color: ${theme.color.neutral.textStrong};
    }

    &:hover {
      cursor: pointer;
      font: ${theme.font.enabledStrong16};
      color: ${theme.color.neutral.textStrong};
    }
  `;
};
