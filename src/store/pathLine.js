import { atom } from "recoil";

const initialState = [
  {
    path: [
      { lat: 37.5467, lng: 127.1191 },
      { lat: 37.5464, lng: 127.1197 },
      { lat: 37.547, lng: 127.1203 },
    ],
    opacity: 1,
  },
  {
    path: [
      { lat: 37.5502, lng: 127.1498 },
      { lat: 37.5497, lng: 127.1504 },
      { lat: 37.5504, lng: 127.1505 },
    ],
    opacity: 1,
  },
  {
    path: [
      { lat: 37.5578, lng: 127.1688 },
      { lat: 37.5575, lng: 127.1696 },
      { lat: 37.558, lng: 127.1704 },
    ],
    opacity: 1,
  },
];

export const pathLineState = atom({
  key: "pathLineState",
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
