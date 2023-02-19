import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { lineOption } from "../../store/lineOption";
import { opacity } from "../../store/opacity";
import { polygonOption } from "../../store/polygonOption";
import { polygonPositionState } from "../../store/polygonPositionState";
import { positionState } from "../../store/positionState";
import Marker from "./components/panel/Marker";
import Line from "./components/panel/Line"
import Polygon from "./components/panel/Polygon";

const Panel = ({ panelHide }) => {

  const [center, setCenter] = useRecoilState(positionState);

  const markerHandler = (center) => {
    setCenter(center);
    setNotUpdatedCenter({
      lat: 37.772,
      lng: -122.214,
    });
  };

  // line ploygon 중심값 구하기
  const [NotUpdatedCenter, setNotUpdatedCenter] = useRecoilState(polygonPositionState)

  let updatedCenter;
  let lat;
  let lng;
  const polygonHandler = (center) => {
    setNotUpdatedCenter(center[0]);
    let sumLat = 0;
    let sumLng = 0;
    for (let i = 0; i < center.length; i++) {
      sumLat += center[i].lat;
      sumLng += center[i].lng;
    }
    lat = sumLat / center.length;
    lng = sumLng / center.length;
    updatedCenter = { lat, lng };
    console.log("updatedCenter: ", updatedCenter);
    setCenter(updatedCenter);
  };

  const [optionState, setOptionState] = useRecoilState(lineOption)
  const [optionsPolygonState, setOptionsPolygonState] = useRecoilState(polygonOption)
  const [markerOpacity, setMarkerOpacity] = useRecoilState(opacity)
  const [inputValue, setInputValue] = useState(100);

  return (
    <Container1 isHide={panelHide}>
      <Points>Points</Points>
      <Marker
        markerHandler={markerHandler}
        center={center}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setMarkerOpacity={setMarkerOpacity}
      />
      <Lines>Lines</Lines>
      <Line
        NotUpdatedCenter={NotUpdatedCenter}
        inputValue={inputValue}
        setInputValue={setInputValue}
        polygonHandler={polygonHandler}
        optionState={optionState}
        setOptionState={setOptionState}
      />

      <Polygons>Polygons</Polygons>
      <Polygon
        NotUpdatedCenter={NotUpdatedCenter}
        inputValue={inputValue}
        setInputValue={setInputValue}
        polygonHandler={polygonHandler}
        optionsPolygonState={optionsPolygonState}
        setOptionsPolygonState={setOptionsPolygonState}
      />
    </Container1>
  );
};

const Container1 = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid gray;
  display: ${(props) => (props.isHide ? "none" : "null")};
  transition: 1s;
`;

export const Points = styled.div`
  width: 100%;
  height: 25px;
  padding-left: 10px;
  border-bottom: 1px solid gray;
  background-color: #cccccc;
  display: flex;
  align-items: center;
`;
export const Point = styled.div`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${(props) => (props.active ? "bolder" : null)};
  background-color: ${(props) => (props.active ? "yellow" : null)};
`;
export const Input = styled.input`
  width: 50%;
`;

export const Lines = styled(Points)``;
export const Polygons = styled(Points)``;
export const Line2 = styled(Point)``;
export const Polygon2 = styled(Point)``;

export default Panel;
