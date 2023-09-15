import { create } from 'zustand';

type RegisteredLocationsState = {
  localLocations: LocationType[];
  addLocation: (location: LocationWithQueryType) => void;
  deleteLocation: (id: number) => void;
};

export const useRegisteredLocationsStore = create<RegisteredLocationsState>(
  (set) => ({
    localLocations: [{ id: 1, name: '역삼1동', isMainLocation: true }],
    addLocation: (location: LocationWithQueryType) =>
      set((state) => ({ localLocations: addLocationToState(state, location) })),

    deleteLocation: (id: number) =>
      set((state) => ({ localLocations: deleteLocationFromState(state, id) })),
  }),
);

const addLocationToState = (
  state: RegisteredLocationsState,
  location: LocationWithQueryType,
) => {
  console.log(state.localLocations, '확인중');

  if (!state.localLocations.some((item) => item.id === location.id)) {
    return [...state.localLocations, { ...location, isMainLocation: false }];
  } // 초기값이 역삼1동으로 설정돼있음 이후 추가되는 값의 isMain을 false로 지정하여 첫번째 요소가 메인이 되는걸 유지
  return state.localLocations;
};

const deleteLocationFromState = (
  state: RegisteredLocationsState,
  id: number,
) => {
  const isMainLocationDeleted = state.localLocations.some(
    (location) => location.id === id && location.isMainLocation,
  );

  const updatedList = state.localLocations.filter(
    (location) => location.id !== id,
  );

  if (isMainLocationDeleted) {
    updatedList[0].isMainLocation = true;
  }

  return updatedList;
};
