import { atom } from "recoil";

const initialState = [
  {
    path: { lat: 37.772, lng: -122.214 },
    opacity: 1,
  },
  {
    path: { lat: 37.772, lng: -110.214 },
    opacity: 1,
  },
  {
    path: { lat: 37.772, lng: -100.214 },
    opacity: 1,
  },
];

export const pathState = atom({
  key: "pathState",
  default: initialState,
});

export const option = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  overviewMapControl: true,
  rotateControl: true,
};
