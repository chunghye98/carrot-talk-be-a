import { create } from 'zustand';

type LayoutState = {
  shouldSlideLeft: boolean;
  setShouldSlideLeft: () => void;
};

export const useLayoutStore = create<LayoutState>((set, get) => ({
  shouldSlideLeft: false,
  setShouldSlideLeft: () => {
    const currentState = get().shouldSlideLeft;
    set({ shouldSlideLeft: !currentState });
  },
}));
