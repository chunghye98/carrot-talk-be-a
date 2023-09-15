import { Theme, css } from '@emotion/react';

type Props = {
  icon: string;
  label: string;
  onSelectCategory: () => void;
};

export const Option: React.FC<Props> = ({ icon, label, onSelectCategory }) => {
  // TODO 메인에서 미리 데이터가 받아와져 있어야함

  return (
    <div css={(theme) => optionStyle(theme, icon)} onClick={onSelectCategory}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
};

const optionStyle = (theme: Theme, icon: string) => {
  return css`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 80px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: ${icon ? '' : theme.color.neutral.backgroundBold};
    }
    span {
      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.text};
    }
  `;
};
