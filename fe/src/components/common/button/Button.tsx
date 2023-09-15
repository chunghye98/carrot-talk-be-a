import { Theme, css } from '@emotion/react';
import { ButtonHTMLAttributes, FC } from 'react';

export type ButtonProps = {
  variant: 'rectangle' | 'category' | 'text' | 'fab';
  state?: 'default' | 'active';
  size?: 's' | 'l';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ variant, size = 'l', state, ...props }) => {
  return (
    <button
      css={(theme) => buttonStyle(theme, variant, size, state)}
      {...props}
    >
      {props.children}
    </button>
  );
};

const buttonStyle = (
  theme: Theme,
  variant: 'rectangle' | 'category' | 'text' | 'fab',
  size: 's' | 'l',
  state?: 'default' | 'active',
) => {
  const SIZE_STYLES = {
    rectangle: {
      s: {
        padding: '8px 16px',
        width: 'fit-content',
        font: theme.font.availableStrong12,
      },
      l: {
        padding: '16px',
        width: '329px',
        font: theme.font.availableStrong16,
      },
    },
    fab: {
      s: {
        width: '32px',
        height: '32px',
      },
      l: {
        width: '56px',
        height: '56px',
      },
    },
  };

  const VARIANT = {
    rectangle: {
      ...SIZE_STYLES.rectangle[size],
      borderRadius: '8px',
      gap: '4px',
    },
    category: {
      height: '32px',
      padding: '0px 16px',
      borderRadius: '50px',
      font: theme.font.displayDefault12,
    },
    fab: {
      ...SIZE_STYLES.fab[size],
      borderRadius: '56px',
      backgroundColor: theme.color.accent.backgroundPrimary,
    },
    text: {
      gap: '8px',
      padding: '8px',
      font: theme.font.availableStrong16,
      color: theme.color.neutral.text,
    },
  };

  const STATE = {
    default: {
      border: `1px solid ${theme.color.neutral.border}`,
      color: theme.color.accent.textWeak,
    },
    active: {
      background: theme.color.accent.backgroundPrimary,
      color: theme.color.accent.text,
    },
  };

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    ${VARIANT[variant]}
    ${state && STATE[state]}

    &:hover, &:active {
      opacity: 0.8;
    }

    &:disabled {
      cursor: default;
      opacity: 0.32;
    }
  `;
};
