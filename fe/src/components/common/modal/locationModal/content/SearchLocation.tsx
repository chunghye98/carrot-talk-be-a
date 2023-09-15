import { Input } from '@components/common/input/Input';
import { useLocationWithQuery } from '@/queries/location';
import { css } from '@emotion/react';
import { useState } from 'react';
import { ModalHeader } from '../../ModalHeader';
import { ModalListItem } from '../../ModalListItem';
import { usePopupStore } from '@/stores/popupStore';

type Props = {
  onToggleContent: (content: 'control' | 'search') => void;
  onPatchLocationByAuth: (location: LocationType) => void;
};

export const SearchLocation: React.FC<Props> = ({
  onToggleContent,
  onPatchLocationByAuth,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const trimedInputValue = inputValue.trim();
  const { locations, refetch: refetchLocations } =
    useLocationWithQuery(trimedInputValue);
  const [hasPressedEnter, setHasPressedEnter] = useState<boolean>(false);
  const { togglePopup, setCurrentDim } = usePopupStore();

  const onChangeInput = (value: string) => {
    setInputValue(value);
    setHasPressedEnter(false);
  };

  const onSearchLocation = () => {
    refetchLocations();
    setHasPressedEnter(true);
  };

  const onChangeMainLocation = (location: LocationType) => {
    setInputValue('');
    onPatchLocationByAuth(location);
  };

  const onCloseModal = () => {
    togglePopup('modal', false);
    setCurrentDim(null);
    onToggleContent('control');
  };

  return (
    <>
      <ModalHeader
        onNavigateBack={() => onToggleContent('control')}
        onCloseModal={onCloseModal}
      />
      <div css={searchLocationStyle}>
        <div className="input__search">
          <Input
            onChange={onChangeInput}
            onPressEnter={onSearchLocation}
            placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
            radius="s"
            variant="filled"
          />
        </div>

        {hasPressedEnter && locations && (
          <ul>
            {locations.map((location) => (
              <ModalListItem
                key={location.id}
                name={location.name}
                onClick={() => {
                  onChangeMainLocation(location);
                  onToggleContent('control');
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const searchLocationStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  .input__search {
    padding: 0 16px;
  }

  ul {
    height: 570px;
  }
`;
