import { useNickname } from '@/hooks/useNickname';
import { useSignup } from '@/queries/auth';
import { useAuthStore } from '@/stores/authStore';
import { useRegisteredLocationsStore } from '@/stores/locationStore';
import { usePopupStore } from '@/stores/popupStore';
import { setLoginInfo } from '@/utils/localStorage';
import { ReactComponent as Check } from '@assets/check.svg';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { Button } from '@components/common/button/Button';
import { Input } from '@components/common/input/Input';
import { LocationModal } from '@components/common/modal/locationModal/LocationModal';
import { LeftButton } from '@components/common/topBar/LeftButton';
import { RightButton } from '@components/common/topBar/RightButton';
import { Title } from '@components/common/topBar/Title';
import { TopBar } from '@components/common/topBar/TopBar';
import { PATH } from '@constants/path';

import { Theme, css } from '@emotion/react';
import { Navigate, useNavigate } from 'react-router-dom';

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const {
    nickname,
    isValidNickname,
    isUniqueNickname,
    nicknameInputWarning,
    onChangeNickname,
    checkNicknameUnique,
  } = useNickname({
    validateNickname: (nickname: string) =>
      /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/.test(nickname),
    defaultWarning: '2~10글자 닉네임을 입력하세요',
  });
  const { localLocations } = useRegisteredLocationsStore();
  const { togglePopup, setCurrentDim } = usePopupStore();
  const { signUpInProgress } = useAuthStore();
  const signupMutation = useSignup();

  const submitEnabled =
    isUniqueNickname && localLocations && localLocations.length > 0;

  const goToAuth = () => {
    navigate(PATH.account, { replace: true });
  };

  const openLocationModal = () => {
    togglePopup('modal', true);
    setCurrentDim('modal');
  };

  const requestSignup = () => {
    if (!submitEnabled) {
      return;
    }

    const mainLocationId = localLocations.find(
      (location: LocationType) => location.isMainLocation,
    )?.id as number;
    const subLocationId = localLocations?.find(
      (location: LocationType) => !location.isMainLocation,
    )?.id;

    const signupInfo = {
      nickname,
      mainLocationId,
      ...(!!subLocationId && { subLocationId }),
    };

    signupMutation.mutate(signupInfo, {
      onSuccess: ({ data }) => {
        setLoginInfo(data);
        navigate(PATH.home, { replace: true });
      },
      onError: (error) => {
        if (error instanceof Error) {
          throw error;
        }
      },
    });
  };

  if (!signUpInProgress) {
    return <Navigate to={PATH.account} replace={true} />;
  }

  return (
    <>
      <TopBar>
        <Title>회원가입</Title>
        <LeftButton>
          <Button variant="text" onClick={goToAuth}>
            <span className="control-btn">닫기</span>
          </Button>
        </LeftButton>
        <RightButton>
          <Button
            variant="text"
            disabled={!submitEnabled}
            onClick={requestSignup}
          >
            <span className="control-btn">확인</span>
          </Button>
        </RightButton>
      </TopBar>
      <div css={(theme) => pageStyle(theme)}>
        <div className="signup-form">
          <div className="nickname-form">
            <span>닉네임</span>
            <div className="nickname-form__input">
              <Input
                variant="outlined"
                radius="s"
                placeholder="2~10글자 닉네임을 입력하세요"
                minLength={2}
                maxLength={10}
                value={nickname}
                onChange={onChangeNickname}
                warningMessage={nicknameInputWarning}
              />
              {isUniqueNickname ? (
                <Check className="nickname-form__input--check" />
              ) : (
                <Button
                  variant="rectangle"
                  state="active"
                  size="s"
                  disabled={!isValidNickname}
                  onClick={checkNicknameUnique}
                >
                  중복 체크
                </Button>
              )}
            </div>
          </div>
          <div className="location__form">
            <Button
              variant="rectangle"
              state="default"
              onClick={openLocationModal}
            >
              <Plus />
              위치 추가
            </Button>
          </div>
        </div>
        <LocationModal locationList={localLocations} />
      </div>
    </>
  );
};

const pageStyle = (theme: Theme) => {
  return css`
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 32px;

    .signup-form {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .nickname-form {
      display: flex;
      flex-direction: column;
      gap: 8px;

      & > span {
        font: ${theme.font.displayStrong16};
        color: ${theme.color.neutral.textStrong};
      }

      .nickname-form__input {
        display: flex;
        gap: 4px;

        &--check {
          align-self: center;
          stroke: ${theme.color.accent.text};
          background-color: ${theme.color.brand.primaryStrong};
          border-radius: 50%;
        }
      }
    }
  `;
};
