import { Theme, css } from '@emotion/react';
import { BezeledX } from '../icons';
import { ImageBox, ImageBoxProps } from './ImageBox';

type Props = {
  label?: string;
} & ImageBoxProps;

export const PictureItem: React.FC<Props> = ({
  label,
  variant,
  size,
  imageUrl,
}) => {
  return (
    <div css={(theme) => pictureItemStyle(theme)}>
      <ImageBox variant={variant} size={size} imageUrl={imageUrl} />
      <button type="button" className="picture-item__remove-btn">
        <BezeledX />
      </button>
      {label && <div className="picture-item__label">{label}</div>}
    </div>
  );
};

const pictureItemStyle = (theme: Theme) => css`
  position: relative;

  & .picture-item__remove-btn {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 28px;
    height: 28px;

    & > svg {
      fill: ${theme.color.neutral.textStrong};
    }
  }

  & .picture-item__label {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 16px 16px;
    background: ${theme.color.neutral.overlay};
    font: ${theme.font.displayDefault12};
    color: ${theme.color.neutral.background};
  }
`;
