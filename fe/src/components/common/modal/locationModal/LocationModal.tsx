import { usePopupStore } from '@stores/popupStore';
import { Modal } from '@components/common/modal/Modal';
import { useState } from 'react';
import { ControlLocation } from './content/ControlLocation';
import { SearchLocation } from './content/SearchLocation';
import { useDeleteLocation, usePatchMainLocation } from '@/queries/location';
import { useRegisteredLocationsStore } from '@/stores/locationStore';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  locationList?: LocationType[];
};

export const LocationModal: React.FC<Props> = ({ locationList }) => {
  const { isLogin } = useAuth();
  const patchMainLocationById = usePatchMainLocation();
  const deleteLocationById = useDeleteLocation();
  const { addLocation, deleteLocation } = useRegisteredLocationsStore();
  const { isOpen, currentDim } = usePopupStore();
  const [toggleContent, setToggleContent] = useState<'control' | 'search'>(
    'control',
  );

  const onToggleContent = (content: 'control' | 'search') => {
    setToggleContent(content);
  };

  const onPatchLocationByAuth = (location: LocationType) => {
    if (isLogin) {
      patchMainLocationById(location, () => {
        onToggleContent('control');
      });
    } else {
      addLocation(location);
    }
  };

  const onDeleteLocationByAuth = isLogin ? deleteLocationById : deleteLocation;

  return (
    <Modal isOpen={isOpen.modal} currentDim={currentDim}>
      {toggleContent === 'control' ? (
        <ControlLocation
          locationList={locationList}
          onToggleContent={onToggleContent}
          onPatchLocationByAuth={onPatchLocationByAuth}
          onDeleteLocationByAuth={onDeleteLocationByAuth}
        />
      ) : (
        <SearchLocation
          onToggleContent={onToggleContent}
          onPatchLocationByAuth={onPatchLocationByAuth}
        />
      )}
    </Modal>
  );
};
