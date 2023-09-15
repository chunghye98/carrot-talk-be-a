export const setUserInfo = (userInfo: {
  id: number;
  nickname: string;
  imageUrl: string;
}) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem('refreshToken', token);
};

export const setLoginInfo = (loginInfo: {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    nickname: string;
    imageUrl: string;
  };
}) => {
  setAccessToken(loginInfo.accessToken);
  setRefreshToken(loginInfo.refreshToken);
  setUserInfo(loginInfo.user);
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) return null;

  return JSON.parse(userInfo);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const getTokens = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
  };
};

export const clearUserInfo = () => {
  localStorage.removeItem('userInfo');
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const clearLoginInfo = () => {
  clearUserInfo();
  clearTokens();
};
