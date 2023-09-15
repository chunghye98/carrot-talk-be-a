import { createContext } from "react";

type DropdownContextProps = {
  autoClose: boolean;
  closeMenu: () => void;
}

export const DropdownContext = createContext<DropdownContextProps>({
  autoClose: false,
  closeMenu: () => {},
});