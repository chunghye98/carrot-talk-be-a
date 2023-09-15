import { css } from '@emotion/react';
import { Theme } from '@emotion/react/macro';
import { Button } from '../button/Button';
import { X, ChevronLeft } from '../icons';

type Props = {
  title?: string;
  onNavigateBack?: () => void;
  onCloseModal: () => void;
};

export const ModalHeader: React.FC<Props> = ({
  title,
  onNavigateBack,
  onCloseModal,
}) => {
  return (
    <div css={modalHeaderStyle}>
      {onNavigateBack && (
        <Button variant="text" onClick={onNavigateBack}>
          <ChevronLeft className="chevron-left" />
        </Button>
      )}
      {title}
      <Button variant="text" onClick={onCloseModal}>
        <X className="x-icon" />
      </Button>
    </div>
  );
};

const modalHeaderStyle = (theme: Theme) => {
  return css`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    padding: 12px 12px 16px 24px;
    font: ${theme.font.displayStrong20};

    .chevron-left {
      stroke: ${theme.color.neutral.textStrong};
    }

    .x-icon {
      stroke: ${theme.color.neutral.textStrong};
    }
  `;
};
