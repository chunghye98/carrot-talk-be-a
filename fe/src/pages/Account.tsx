import { useLogout } from '@/queries/auth';
import kakaoLogin from '@assets/kakao_login.png';
import { ReactComponent as UserCircle } from '@assets/user-circle.svg';
import { Button } from '@components/common/button/Button';
import { Beez } from '@components/common/icons';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { KAKAO_AUTH_URL, PATH } from '@constants/path';
import { Theme, css } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import { clearLoginInfo } from '@utils/localStorage';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const navigate = useNavigate();

  const { isLogin, userInfo } = useAuth();
  const logoutMutation = useLogout();

  const onClickLogin = () => {
    location.assign(KAKAO_AUTH_URL);
  };

  const onClickLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearLoginInfo();
        navigate(PATH.account, { replace: true });
      },
    });
  };

  return (
    <>
      <TopBar>
        <Title>내 계정</Title>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        {isLogin ? (
          <>
            <div className="auth-info">
              <div className="user-profile">
                {userInfo.imageUrl ? (
                  <img src={userInfo.imageUrl} alt="프로필 사진" />
                ) : (
                  <UserCircle />
                )}
              </div>
              <div className="user-name">{userInfo.nickname}</div>
            </div>
            <div className="button__wrapper">
              <Button
                variant="rectangle"
                state="active"
                onClick={onClickLogout}
              >
                로그아웃
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="service-info">
              <div className="service-info__title">꿀 찾고 계신가요?</div>
              <h2 className="service-info__name">BEE 마켓</h2>
              <div className="service-info__description">
                여기저기 숨어있는 꿀 같은 거래,
                <br />
                BEE 마켓에서 찾아드릴게요!
              </div>
            </div>
            <Beez />
            <div className="button__wrapper">
              <Button variant="text" onClick={onClickLogin}>
                <img src={kakaoLogin} alt="카카오 소셜 로그인" />
              </Button>
            </div>
          </>
        )}
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
    font: ${theme.font.displayStrong16};
    color: ${theme.color.neutral.textStrong};
    gap: 24px;

    .service-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      &__name {
        font: ${theme.font.displayStrong32};
        color: ${theme.color.brand.primary};
      }

      &__description {
        text-align: center;
        font: ${theme.font.displayDefault12};
        color: ${theme.color.neutral.text};
      }
    }

    .auth-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
    }

    .user-profile {
      display: flex;
      justify-content: center;

      & > img,
      & > svg {
        height: 80px;
        width: 80px;
      }

      & > img {
        object-fit: cover;
        border-radius: 50%;
      }

      & > svg {
        stroke: ${theme.color.neutral.text};
      }
    }

    .user-name {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .button__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
};
