import { Theme, css } from '@emotion/react';
import { formatCount } from '@utils/formatCount';
import { formatPrice } from '@utils/formatPrice';
import { formatTimeStamp } from '@utils/formatTimeStamp';
import { FC } from 'react';
import { Button } from '../button/Button';
import { Dropdown } from '../dropdown/Dropdown';
import { Dots, Heart, Message } from '../icons';
import { ImageBox } from '../imageBox/ImageBox';
import { MenuBox } from '../menu/MenuBox';
import { MenuItem } from '../menu/MenuItem';
import { StatusBadge } from '../statusBadge/StatusBadge';

type Props = {
  product: ProductType; // TODO : product 타입 변경
  onOpenDetail?: () => void;
};

export const ListItem: FC<Props> = ({ product, onOpenDetail }) => {
  const formattedPrice = formatPrice(product.price);
  const formattedTimeStamp = formatTimeStamp(product.createdAt);
  const formattedChatCount = formatCount(product.chatCount);
  const formattedLikeCount = formatCount(product.likeCount);
  // const isAuthor = getUserInfo()
  //   ? getUserInfo()?.id === product.sellerId
  //   : false;
  const isAuthor = true;
  // TODO : dots 드롭다운 달고 기능구현
  return (
    <li css={listItemStyle} onClick={onOpenDetail}>
      <ImageBox imageUrl={product.imageUrl} size="l" />
      <div className="text-area">
        <div className="text-area__information">
          <div className="text-area__information-title">
            <span>{product.name}</span>
            {isAuthor && (
              <Dropdown
                opener={
                  <Button variant="text" onClick={() => {}}>
                    <Dots />
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
          </div>
          <div className="text-area__information-location">
            {product.location} · {formattedTimeStamp}
          </div>
          <div className="text-area__information-state">
            {product.status && <StatusBadge state={product.status} />}
            {formattedPrice}
          </div>
        </div>

        <div className="text-area__icons">
          {product.chatCount > 0 && (
            <div>
              <Message />
              <span>{formattedChatCount}</span>
            </div>
          )}
          {product.likeCount > 0 && (
            <div>
              <Heart />
              <span>{formattedLikeCount}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const listItemStyle = (theme: Theme) => {
  return css`
    box-sizing: border-box;
    display: flex;
    padding: 16px 0px;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;

    .text-area {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      flex: 1 0 0;
      align-self: stretch;

      &__information {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;

        &-title {
          display: flex;
          min-height: 24px;
          max-height: 48px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 4px;
          align-self: stretch;
          font: ${theme.font.displayDefault16};
          color: ${theme.color.neutral.textStrong};

          button {
            padding: 0;
          }

          svg {
            fill: ${theme.color.neutral.textStrong};
          }
        }

        &-location {
          font: ${theme.font.displayDefault12};
          color: ${theme.color.neutral.textWeak};
        }

        &-state {
          display: flex;
          align-items: center;
          gap: 4px;
          font: ${theme.font.displayStrong16};
          color: ${theme.color.neutral.textStrong};
        }
      }

      &__icons {
        display: flex;
        align-items: center;
        gap: 8px;

        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.textWeak};
        svg {
          width: 16px;
          height: 16px;
          stroke: ${theme.color.neutral.textWeak};
        }

        > div {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    border-bottom: 0.8px solid ${theme.color.neutral.border};
  `;
};
