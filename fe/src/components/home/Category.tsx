import { Theme, css } from '@emotion/react';
import { TopBar } from '../common/topBar/TopBar';
import { Title } from '../common/topBar/Title';
import { LeftButton } from '../common/topBar/LeftButton';
import { Button } from '../common/button/Button';
import { ChevronLeft } from '../common/icons';
import { Option } from './Option';

type Props = {
  categories?: CategoryType[];
  onSelectCategory: (id: number) => void;
  onCloseCategory: () => void;
};

export const Category: React.FC<Props> = ({
  categories,
  onSelectCategory,
  onCloseCategory,
}) => {
  return (
    <>
      <div css={(theme) => pageStyle(theme)}>
        <TopBar>
          <LeftButton>
            <Button variant="text" onClick={onCloseCategory}>
              <ChevronLeft className="button__back" />
              닫기
            </Button>
          </LeftButton>
          <Title>카테고리</Title>
        </TopBar>
        <div className="page">
          {categories &&
            categories.map((category) => (
              <Option
                key={category.id}
                icon={category.imageUrl}
                label={category.name}
                onSelectCategory={() => {
                  onSelectCategory(category.id);
                  onCloseCategory();
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    overflow-y: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    width: 100%;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 100%;
    z-index: 100;

    background-color: ${theme.color.neutral.background};

    .button__back {
      stroke: ${theme.color.neutral.textStrong};
    }

    .page {
      padding: 40px;
      box-sizing: border-box;

      display: flex;
      flex-wrap: wrap;

      justify-content: flex-start;
      align-items: center;
      gap: 32px;
    }
  `;
};
