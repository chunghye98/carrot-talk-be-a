type PopupType = 'modal' | 'alert';

type LocationDataFromServer = {
  success: boolean;
  data: LocationType[];
};

type LocationType = {
  id: number;
  name: string;
  isMainLocation?: boolean;
};

type UserType = {
  id: number;
  nickname: string;
  imageUrl: string;
};

type LocationWithQueryDataFromServer = {
  success: boolean;
  data: LocationWithQueryType[];
};

type LocationWithQueryType = {
  id: number;
  name: string;
};

type CategoriesDataFromServer = {
  success: boolean;
  data: CategoryType[];
};

type CategoryType = {
  id: number;
  name: string;
  imageUrl: string;
};

type ProductType = {
  id: number;
  sellerId: number;
  name: string;
  location: string;
  imageUrl: string;
  createdAt: string;
  price: number;
  status: string;
  likeCount: number;
  chatCount: number;
};

type ProductsDataFromServer = {
  success: boolean;
  data: {
    products: ProductType[];
    nextId: number;
  };
};

type FetchProductsParams = {
  locationId?: number | null;
  categoryId?: number | null;
  next?: number | null;
  size?: number | null;
};

type SignupData = {
  nickname: string;
  mainLocationId: number;
  subLocationId?: number;
};

type SignupDataFromServer = {
  success: boolean;
  data: {
    isUser: boolean;
    accessToken: string;
    refreshToken: string;
    user: UserType;
  };
};

type LoginDataFromServer = {
  success: true;
  data:
    | {
        isUser: true;
        accessToken: string;
        refreshToken: string;
        user: UserType;
      }
    | {
        isUser: false;
        accessToken: string;
      };
};
