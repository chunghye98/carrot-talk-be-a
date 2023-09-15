import { useNicknameCheck } from '@/queries/auth';
import { useEffect, useState } from 'react';

type NicknameInputType = {
  defaultWarning: string;
  initialNickname?: string;
  validateNickname?: (nickname: string) => boolean;
};

export const useNickname = ({
  defaultWarning,
  validateNickname = () => true,
}: NicknameInputType) => {
  const [isValidNicknameCheck, setIsValidNicknameCheck] = useState(false);
  const { nickname, onChangeNickname, isValidNickname, nicknameInputWarning } =
    useNicknameInput({
      validateNickname,
      defaultWarning,
    });
  const nicknameCheckResult = useNicknameCheck(nickname);

  useEffect(() => {
    setIsValidNicknameCheck(false);
  }, [nickname]);

  const checkNicknameUnique = () => {
    nicknameCheckResult.refetch();
    setIsValidNicknameCheck(true);
  };

  return {
    nickname,
    isValidNickname,
    isUniqueNickname:
      isValidNicknameCheck && nicknameCheckResult.data?.isUnique,
    nicknameInputWarning:
      (isValidNickname && nicknameCheckResult.data?.message) ||
      nicknameInputWarning,
    onChangeNickname,
    checkNicknameUnique,
  };
};

const useNicknameInput = ({
  defaultWarning,
  validateNickname = () => true,
}: NicknameInputType) => {
  const [nickname, setNickname] = useState('');

  const onChangeNickname = (value: string) => {
    setNickname(value);
  };

  const isValidNickname = validateNickname(nickname);
  const nicknameInputWarning = isValidNickname ? '' : defaultWarning;

  return {
    nickname,
    onChangeNickname,
    isValidNickname,
    nicknameInputWarning,
  };
};
