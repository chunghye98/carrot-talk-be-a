import { Theme, css } from '@emotion/react';

import { PostBar } from '@/components/common/actionBar/PostBar';
import { Button } from '@/components/common/button/Button';
import { Dropdown } from '@/components/common/dropdown/Dropdown';
import { MenuBox } from '@/components/common/menu/MenuBox';
import { MenuItem } from '@/components/common/menu/MenuItem';
import { LeftButton } from '@/components/common/topBar/LeftButton';
import { RightButton } from '@/components/common/topBar/RightButton';
import { TopBar } from '@/components/common/topBar/TopBar';
import { formatPrice } from '@/utils/formatPrice';
import { formatTimeStamp } from '@/utils/formatTimeStamp';
import {
  ChevronDown,
  ChevronLeft,
  Dots,
  Heart,
} from '@components/common/icons';

const mock = {
  imageUrls: ['www.naver.com', 'www.google.com'], // 첫 번째 원소가 대표 이미지
  seller: {
    id: 1,
    nickname: 'June',
  },
  product: {
    location: '역삼1동',
    status: '판매중',
    title: '빈티지 롤러 스케이트',
    category: '가구/인테리어',
    createdAt: '2023-08-22T05:48',
    content: '제발 사줘',
    chatCount: 3,
    likeCount: 1,
    hits: 14,
    price: 500000,
    isLiked: true,
  },
};
export const ProductDetail: React.FC = () => {
  // const { id } = useParams();
  // const isAuthor = getUserInfo()
  //   ? getUserInfo()?.id === product.sellerId
  //   : false;

  const randomGitProfile =
    'https://avatars.githubusercontent.com/u/52685259?v=4';
  const isAuthor = true;
  const formattedPrice = formatPrice(mock.product.price);
  const formattedTimeStamp = formatTimeStamp(mock.product.createdAt);
  const productStatus = mock.product.status;
  const isLiked = true;
  // TODO 상단 네비게이션은 해당 화면 첫 진입시 배경이 투명하다가, 스크롤을 하면 배경이 불투명하고 본문과 구분선이 표시되도록 한다.

  return (
    <div css={(theme) => pageStyle(theme, isLiked)}>
      <TopBar transparent>
        {isAuthor && (
          <RightButton>
            <Dropdown
              align="right"
              opener={
                <Button variant="text" className="button__status">
                  <Dots />
                </Button>
              }
              menu={
                <MenuBox>
                  <MenuItem onClick={() => {}}>게시글 수정</MenuItem>
                  <MenuItem variant="warning" onClick={() => {}}>
                    삭제
                  </MenuItem>
                </MenuBox>
              }
            />
          </RightButton>
        )}

        <LeftButton>
          <Button className="button__back" variant="text" onClick={() => {}}>
            <ChevronLeft />
            뒤로
          </Button>
        </LeftButton>
      </TopBar>
      <div className="page-content">
        <div className="thumbnail-box">
          <img src={randomGitProfile} /> <img src={randomGitProfile} />
          <img src={randomGitProfile} />
          <div className="thumbnail-page-nav">
            {mock.imageUrls.length} / {mock.imageUrls.length}
          </div>
        </div>

        <div className="page-content-info">
          <div className="seller">
            <p className="seller-label">판매자 정보</p>
            <p className="seller-name">{mock.seller.nickname}</p>
          </div>
          {isAuthor && (
            <Dropdown
              opener={
                <Button
                  variant="text"
                  state="default"
                  className="button__status"
                >
                  <p>{productStatus}</p>
                  <ChevronDown />
                </Button>
              }
              menu={
                <MenuBox>
                  <MenuItem onClick={() => {}}>판매중</MenuItem>
                  <MenuItem onClick={() => {}}>예약중</MenuItem>
                  <MenuItem onClick={() => {}}>판매완료</MenuItem>
                </MenuBox>
              }
            ></Dropdown>
          )}
          <div className="description">
            <div className="description-title">
              <p className="title">{mock.product.title}</p>
              <p className="category">
                {mock.product.category} · {formattedTimeStamp}
              </p>
            </div>
            <div className="description-body">
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
              {mock.product.content}
            </div>
            <div className="description-caption">
              <div>
                <span>채팅</span>
                <span>{mock.product.chatCount}</span>
              </div>
              <div>
                <span>관심</span>
                <span>{mock.product.likeCount}</span>
              </div>
              <div>
                <span>조회</span>
                <span>{mock.product.hits}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostBar isLiked={true}>
        <div className="info">
          {/* 
        info 클래스 네임으로 사용처에서 스타일을 주어 두 요소를 묶어줍니다 
          display: flex;
          gap: 8px;
          align-items: center;
        */}
          <Heart className="like-icon" onClick={() => {}} />
          {formattedPrice}
        </div>
        <Button variant="rectangle" size="s" state="active" onClick={() => {}}>
          대화 중인 채팅방{/* count가 추가될 수 있습니다 */}
        </Button>
      </PostBar>
    </div>
  );
};

const pageStyle = (theme: Theme, isLiked: boolean) => {
  return css`
    border: 1px solid red;
    * {
    }

    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;

    .button__back {
      color: ${theme.color.accent.text};
      path: red;
    }

    .page-content {
      margin-top: -64px;
      padding-bottom: 64px;
      box-sizing: border-box;
    }

    .thumbnail-box {
      position: relative;
      display: flex;
      height: 491px;
      width: 100%;
      border: 1px solid red;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .thumbnail-page-nav {
      position: absolute;
      bottom: 16px;
      right: 16px;
      display: inline-flex;
      padding: 8px 16px;
      align-items: flex-start;
      gap: 4px;
      border-radius: 16px;
      background: ${theme.color.neutral.backgroundBlur};

      font: ${theme.font.displayDefault12};
      color: ${theme.color.neutral.textWeak};
    }

    .page-content-info {
      padding: 16px;
      display: flex;
      gap: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .seller {
        border-radius: 12px;
        background: ${theme.color.neutral.backgroundWeak};
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 16px;
        justify-content: space-between;
        align-items: center;

        &-label {
          font: ${theme.font.displayDefault16};
          color: ${theme.color.neutral.text};
        }
        &-name {
          font: ${theme.font.displayStrong16};
          color: ${theme.color.neutral.textStrong};
        }
      }

      .button__status {
        display: inline-flex;
        height: 32px;
        padding: 0px 16px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        border-radius: 8px;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textStrong};

        p {
          width: 56px;
          text-align: start;
        }
        svg {
          width: 16px;
          height: 16px;
          stroke: ${theme.color.neutral.textStrong};
        }
      }
    }

    .description {
      display: flex;
      width: 363px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      &-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        .title {
          font: ${theme.font.displayStrong20};
          color: ${theme.color.neutral.textStrong};
        }
        .category {
          font: ${theme.font.displayDefault12};
          color: ${theme.color.neutral.textWeak};
        }
      }

      &-body {
        min-width: 100%;
        border: 1px solid ${theme.color.neutral.border};
        font: ${theme.font.displayDefault16};
        color: ${theme.color.neutral.text};
      }

      &-caption {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};

        div {
          display: flex;
          align-items: flex-start;
          gap: 4px;
        }
      }
    }

    .info {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .like-icon {
      cursor: pointer;
      stroke: ${isLiked
        ? theme.color.system.warning
        : theme.color.neutral.textStrong};
      fill: ${isLiked ? theme.color.system.warning : ''};
    }
  `;
};
