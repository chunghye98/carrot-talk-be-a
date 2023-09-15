import { checkNickname, login, logout, refreshToken, signup } from '@api/api';
import { QUERY_KEY } from '@constants/queryKey';
import { getRefreshToken, setAccessToken } from '@utils/localStorage';
import { useMutation, useQuery } from 'react-query';

export const useNicknameCheck = (nickname: string) =>
  useQuery({
    queryKey: [QUERY_KEY.nicknameCheck, nickname],
    queryFn: () => checkNickname(nickname),
    select: (data) => ({
      isUnique: data.success,
      message: data?.errorCode?.message ?? '',
    }),
    enabled: false,
    retry: false,
  });

export const useTokenRefresh = () => {
  const tokenRefreshQuery = useQuery({
    queryKey: QUERY_KEY.tokenRefresh,
    queryFn: () => refreshToken(),
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
    enabled: !!getRefreshToken(),
    select: (data) => {
      if (data.success) {
        return data.data.accessToken;
      }
    },
  });

  if (tokenRefreshQuery.data) {
    setAccessToken(tokenRefreshQuery.data);
  }
};

export const useSignup = () =>
  useMutation<SignupDataFromServer, unknown, SignupData>({
    mutationFn: (signupInfo: SignupData) => signup(signupInfo),
  });

export const useLogin = () =>
  useMutation<LoginDataFromServer, unknown, string>({
    mutationFn: (code: string) => login(code),
  });

export const useLogout = () =>
  useMutation({
    mutationFn: () => logout(),
  });
