import { Theme, css } from '@emotion/react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<Props> = ({ ...rest }) => {
  return <textarea css={(theme) => textAreaStyle(theme)} {...rest} />;
};

const textAreaStyle = (theme: Theme) => css`
  width: 100%;
  height: 200px;
  font: ${theme.font.availableDefault16};

  &::placeholder {
    color: ${theme.color.neutral.textWeak};
  }
`;
