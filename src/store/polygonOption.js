import { atom } from "recoil";

const initialState = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

export const polygonOption = atom({
  key: "polygonOption",
  default: initialState,
});

export const polygonBaseOptions = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "black",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};
