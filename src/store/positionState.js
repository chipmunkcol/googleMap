import { atom } from "recoil";

const initialState = { lat: 37.772, lng: -122.214 };

export const positionState = atom({
  key: "positionState",
  default: initialState,
});
