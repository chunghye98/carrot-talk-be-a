import { BASE_URL, END_POINT } from '@constants/path';
import { getAccessToken, getRefreshToken } from '@utils/localStorage';

const fetchData = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();

    return data;
  }
};

export const getMyLocations = () => {
  return fetchData(END_POINT.locations(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const deleteLocation = (id: number) => {
  return fetchData(END_POINT.locations(id), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const patchMainLocation = (id: number) => {
  return fetchData(END_POINT.locations(), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      locationId: id,
    }),
  });
};

export const checkNickname = async (nickname: string) => {
  return fetchData(END_POINT.nicknameCheck(nickname), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

export const signup = async (signupInfo: SignupData) => {
  return fetchData(END_POINT.signup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(signupInfo),
  });
};

export const login = async (code: string) => {
  return fetchData(END_POINT.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
    }),
  });
};

export const logout = async () => {
  return fetchData(END_POINT.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  });
};

export const refreshToken = async () => {
  return fetchData(END_POINT.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: getRefreshToken(),
    }),
  });
};

export const getLocationWithQuery = (query: string) => {
  return fetchData(END_POINT.locationsOf(encodeURIComponent(query)));
};

export const getCategories = () => {
  return fetchData(END_POINT.categories);
};

export const getProducts = ({
  locationId,
  categoryId,
  size,
  next = 50,
}: FetchProductsParams) => {
  // /api/products?locationId=1&categoryId=3&next=11&size=10
  // TODO 여기 처리 다른곳으로 분리
  const query = new URLSearchParams();

  if (locationId !== undefined && locationId !== null) {
    query.append('locationId', String(locationId));
  }
  if (categoryId !== undefined && categoryId !== null) {
    query.append('categoryId', String(categoryId));
  }
  if (size !== undefined && size !== null) {
    query.append('size', String(size));
  }
  if (next !== undefined && next !== null) {
    query.append('next', String(next));
  }

  console.log(query.toString(), '쿼리확인중');

  return fetchData(END_POINT.products(query.toString()));
};

export const getProductsDetail = (id: number) => {
  return fetchData(`/api/products/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
