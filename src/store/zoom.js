import { atom } from "recoil";

const initialState = 10;

export const zoomState = atom({
  key: "zoomState",
  default: initialState,
});
