import { atom } from "recoil";

const initialState = 1.0;

export const opacityState = atom({
  key: "opacityState",
  default: initialState,
});
