import {
  getAccessToken,
  getRefreshToken,
  getUserInfo,
} from '@utils/localStorage';

export const useAuth = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const userInfo = getUserInfo();

  const isLogin = !!accessToken && !!refreshToken && !!userInfo;

  return {
    isLogin,
    userInfo,
    accessToken,
    refreshToken,
  };
};
