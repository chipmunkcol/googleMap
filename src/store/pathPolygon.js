import { atom } from "recoil";

const initialState = [
  {
    path: [
      { lat: 33.3846, lng: 126.2705 },
      { lat: 33.3778, lng: 126.2757 },
      { lat: 33.382, lng: 126.2873 },
      { lat: 33.3846, lng: 126.2705 },
    ],
    opacity: 1,
  },
  {
    path: [
      { lat: 33.2904, lng: 126.4306 },
      { lat: 33.2774, lng: 126.44 },
      { lat: 33.2835, lng: 126.4563 },
      { lat: 33.2904, lng: 126.4306 },
    ],
    opacity: 1,
  },
  {
    path: [
      { lat: 33.2866, lng: 126.5504 },
      { lat: 33.2775, lng: 126.5596 },
      { lat: 33.2855, lng: 126.572 },
      { lat: 33.2866, lng: 126.5504 },
    ],
    opacity: 1,
  },
];

export const pathPolygonState = atom({
  key: "pathPolygonState",
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
