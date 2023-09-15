import { ReactComponent as Plus } from '@assets/plus.svg';
import { Button } from '@components/common/button/Button';
import { Dropdown } from '@components/common/dropdown/Dropdown';
import { ListBox } from '@components/common/list/ListBox';
import { ListItem } from '@components/common/list/ListItem';
import { MenuBox } from '@components/common/menu/MenuBox';
import { MenuItem } from '@components/common/menu/MenuItem';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { TopBar } from '@components/common/topBar/TopBar';
import { ChevronDown, LayoutGrid } from '@components/common/icons';
import { Theme, css } from '@emotion/react';
import { useState } from 'react';

import { SkeletonListItem } from '@components/common/skeleton/listItem';
import { Category } from '@components/home/Category';
import { useCategories } from '@/queries/category';
import { useIntersectionObserver } from '@hooks/useObserver';
import { useProducts } from '@/queries/products';
import { useAuth } from '@hooks/useAuth';
import { modifiedLocaitionName } from '@utils/modifyLocationName';
import { useLayoutStore } from '@/stores/layoutStore';
import { usePopupStore } from '@/stores/popupStore';
import { useMyLocations } from '@/queries/location';

export const Home: React.FC = () => {
  const { isLogin } = useAuth();
  const { serverLocations } = useMyLocations(isLogin);

  const { categories } = useCategories();
  // useQuery들 묶을수있는지
  const { togglePopup, setCurrentDim } = usePopupStore();

  const mainLocation = serverLocations?.find(
    (location) => location.isMainLocation,
  );
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    mainLocation?.id || 1,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const { setShouldSlideLeft } = useLayoutStore();

  const {
    products,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
    refetch: refetchProductList,
  } = useProducts(selectedLocationId, selectedCategoryId);

  const { observeTarget } = useIntersectionObserver(fetchNextPage, hasNextPage);

  const onOpenModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  const onOpenDetail = (id: number) => {
    //TODO : 상세페이지 보여주기
    console.log(id);
  };

  const onOpenCategory = () => {
    setShouldSlideLeft();
  };

  const onCloseCategory = () => {
    setShouldSlideLeft();
  };

  const onFilterProducts = (id: number) => {
    // TODO : remove와 refetch를 같이 써야하는가?
    refetchProductList();
    setSelectedLocationId(id);
  };

  const onSelectCategory = async (id: number) => {
    // TODO: 두번씩 눌러야 갱신이 되는 버그
    refetchProductList(); //콜백처리
    setSelectedCategoryId(id);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <SkeletonListItem key={index} />
    ));
  };

  const shouldShowSkeletons = status === 'loading' || isFetchingNextPage;
  const shouldShowEndOfData = !hasNextPage && status !== 'loading';

  const mainLocationName = serverLocations
    ? modifiedLocaitionName(mainLocation?.name as string)
    : modifiedLocaitionName('역삼1동');

  const locations = isLogin
    ? serverLocations
    : [{ id: 1, name: '역삼1동', isMainLocation: true }];

  return (
    <>
      <div css={(theme) => pageStyle(theme, shouldShowSkeletons)}>
        <>
          <TopBar>
            <RightButton>
              <Button
                variant="text"
                className="button__topbar"
                onClick={onOpenCategory}
              >
                <LayoutGrid />
              </Button>
            </RightButton>
            <LeftButton>
              <Dropdown
                opener={
                  <Button variant="text" className="button__topbar">
                    {mainLocationName}
                    <ChevronDown />
                  </Button>
                }
                menu={
                  <MenuBox>
                    {/* {locationStatus === 'loading' && (
                      <MenuItem>로딩스피너</MenuItem>
                    )}
                    {locationStatus === 'error' && (
                      <MenuItem>동네 정보를 가져오지 못했습니다</MenuItem>
                    )} */}
                    {locations &&
                      locations.map((location) => (
                        <MenuItem
                          key={location.id}
                          state={
                            selectedLocationId === location.id
                              ? 'selected'
                              : 'default'
                          }
                          onClick={() => onFilterProducts(location.id)}
                        >
                          {location.name}
                        </MenuItem>
                      ))}
                    {isLogin && (
                      <MenuItem onClick={onOpenModal}>
                        내 동네 설정하기
                      </MenuItem>
                    )}
                  </MenuBox>
                }
              />
            </LeftButton>
            <RightButton>
              <Button
                variant="text"
                className="button__topbar"
                onClick={onOpenCategory}
              >
                <LayoutGrid />
              </Button>
            </RightButton>
          </TopBar>
          <Button variant="fab" size="l" className="button__add">
            <Plus />
          </Button>
          <ListBox>
            {products?.map((product) => (
              <ListItem
                key={product.id}
                product={product}
                onOpenDetail={() => onOpenDetail(product.id)}
              />
            ))}
            {shouldShowSkeletons && <>{renderSkeletons()}</>}
          </ListBox>
          {shouldShowEndOfData && (
            <div className="end-of-data">전부 살펴 봤어요!</div>
          )}
          <LocationModal locationList={serverLocations} />
          <div ref={observeTarget} css={obseverStyle}></div>
        </>
      </div>

      <Category
        categories={categories}
        onCloseCategory={onCloseCategory}
        onSelectCategory={onSelectCategory}
      />
    </>
  );
};

const pageStyle = (theme: Theme, shouldShowSkeletons: boolean) => {
  return css`
    overflow-y: ${shouldShowSkeletons ? 'hidden' : 'auto'};

    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
    height: 100vh;

    .button__topbar {
      stroke: ${theme.color.neutral.textStrong};
    }

    .button__add {
      position: absolute;
      bottom: 88px;
      right: 24px;
      z-index: 1;
      stroke: ${theme.color.accent.text};
    }

    .end-of-data {
      cursor: default;
      text-align: center;
      width: 100%;
      padding: 30px 0px 100px 0px;
      font: ${theme.font.displayDefault16};
    }
  `;
};

const obseverStyle = css`
  height: 20px;
  width: 100%;
`;
