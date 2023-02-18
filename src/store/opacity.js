import { atom } from "recoil";

const initialState = 1.0;

export const opacity = atom({
  key: "opacity",
  default: initialState,
});
