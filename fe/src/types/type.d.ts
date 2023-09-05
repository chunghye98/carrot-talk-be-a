type PopupType = 'modal' | 'alert';

type LocationType = {
  id: number;
  name: string;
  isMainLocation: boolean;
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
  locationId?: number;
  categoryId?: number;
  next?: number;
  size?: number;
};
