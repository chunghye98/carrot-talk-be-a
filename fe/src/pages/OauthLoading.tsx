import { useLogin } from '@/queries/auth';
import { useAuthStore } from '@/stores/authStore';
import kakao from '@assets/kakao.png';
import { PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { setAccessToken, setLoginInfo } from '@utils/localStorage';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const OauthLoading: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate: loginMutate } = useLogin();
  const { setSignUpInProgress } = useAuthStore();

  const onLoginSucceeded = useCallback(
    (data: LoginDataFromServer['data']) => {
      if (data.isUser) {
        setLoginInfo(data);
        navigate(PATH.home, { replace: true });
      } else {
        setAccessToken(data.accessToken);
        setSignUpInProgress(true);
        navigate(PATH.signup, { replace: true });
      }
    },
    [navigate, setSignUpInProgress],
  );

  const onLoginFailed = useCallback(() => {
    navigate(PATH.account, { replace: true });
  }, [navigate]);

  useEffect(() => {
    loginMutate(searchParams.get('code') || '', {
      onSuccess: (res) => {
        if (res.success) {
          onLoginSucceeded(res.data);
        } else {
          onLoginFailed();
        }
      },
    });
  }, [loginMutate, searchParams, onLoginSucceeded, onLoginFailed]);

  return (
    <>
      <div css={(theme) => pageStyle(theme)}>
        <img src={kakao} alt="" />
        <div className="loading-message">카카오 로그인 중...</div>
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    font: ${theme.font.displayStrong20};
    font-size: 32px;
    color: ${theme.color.neutral.textStrong};

    & > img {
      width: 100px;
      height: 100px;
    }

    .loading-message {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
};
