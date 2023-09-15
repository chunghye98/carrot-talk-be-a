import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { Theme, css } from '@emotion/react';

export const Chat: React.FC = () => {
  return (
    <>
      <TopBar>
        <Title>채팅</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}></div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    background-color: ${theme.color.neutral.backgroundBold};
    flex: 1;
  `;
};
