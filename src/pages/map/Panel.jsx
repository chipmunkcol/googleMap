import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { lineOption } from "../../store/lineOption";
import { opacity } from "../../store/opacity";
import { position } from "../../store/path";
import { polygonOption } from "../../store/polygonOption";
import { polygonPositionState } from "../../store/polygonPositionState";
import { positionState } from "../../store/positionState";

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
      {position.marker.map((latLng, index) => (
        <Point
          key={index}
          onClick={() => {
            markerHandler(latLng);
          }}
          active={center === latLng ? true : false}
        >
          Point-{index + 1}
          <Input
            type="range"
            value={center === latLng ? inputValue : 100}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onMouseUp={() => {
              const op = (inputValue / 100).toFixed(1);
              setMarkerOpacity(Number(op));
            }}
          />
        </Point>
      ))}
      <Lines>Lines</Lines>
      {position.line.map((latLng, index) => (
        <Line
          key={index}
          onClick={() => {
            polygonHandler(latLng);
          }}
          active={NotUpdatedCenter === latLng[0] ? true : false}
        >
          Line-{index + 1}
          <Input
            type="range"
            value={NotUpdatedCenter === latLng[0] ? inputValue : 100}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onMouseUp={(e) => {
              setOptionState({
                ...optionState,
                strokeOpacity: e.target.value / 100,
              });
            }}
          />
        </Line>
      ))}
      <Polygons>Polygons</Polygons>
      {position.polygon.map((latLng, index) => (
        <Polygon2
          key={index}
          onClick={() => {
            polygonHandler(latLng);
          }}
          active={NotUpdatedCenter === latLng[0] ? true : false}
        >
          Polygon-{index + 1}
          <Input
            type="range"
            value={NotUpdatedCenter === latLng[0] ? inputValue : 100}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onMouseUp={(e) => {
              setOptionsPolygonState({
                ...optionsPolygonState,
                fillOpacity: e.target.value / 100,
              });
            }}
          />
        </Polygon2>
      ))}
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

const Points = styled.div`
  width: 100%;
  height: 25px;
  padding-left: 10px;
  border-bottom: 1px solid gray;
  background-color: #cccccc;
  display: flex;
  align-items: center;
`;
const Point = styled.div`
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
const Input = styled.input`
  width: 50%;
`;

const Lines = styled(Points)``;
const Polygons = styled(Points)``;
const Line = styled(Point)``;
const Polygon2 = styled(Point)``;

export default Panel;
