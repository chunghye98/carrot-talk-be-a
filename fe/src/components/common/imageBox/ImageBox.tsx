import { Theme, css } from '@emotion/react';

export type ImageBoxProps = {
  variant?: 'rectangle' | 'circle';
  size: 's' | 'm' | 'l';
  imageUrl?: string;
};

export const ImageBox: React.FC<ImageBoxProps> = ({
  variant = 'rectangle',
  size,
  imageUrl,
}) => {
  return <div css={(theme) => imageBoxStyle(theme, variant, size, imageUrl)} />;
};

const imageBoxStyle = (
  theme: Theme,
  variant: 'rectangle' | 'circle',
  size: 's' | 'm' | 'l',
  imageUrl?: string,
) => {
  const SIZE_STYLES = {
    s: {
      width: '48px',
      height: '48px',
      borderRadius: variant === 'circle' ? '50%' : '8px',
    },
    m: {
      width: '80px',
      height: '80px',
      borderRadius: '16px',
    },
    l: {
      width: '120px',
      height: '120px',
      borderRadius: '8px',
    },
  };

  return css`
    box-sizing: border-box;
    ${SIZE_STYLES[size]}
    border:  ${imageUrl && `1px solid ${theme.color.neutral.border}`};
    background: ${imageUrl && `url('${imageUrl}')`}
      ${!imageUrl && theme.color.neutral.backgroundBold} 50% / contain no-repeat;
  `;
};
