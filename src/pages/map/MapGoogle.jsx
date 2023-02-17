import styled from "styled-components";
import { position, option } from "../../store/path";
import { useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  PolygonF,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapGoogle = () => {
  const [center, setCenter] = useState({
    lat: 37.772,
    lng: -122.214,
  });

  const markerHandler = (center) => {
    setCenter(center);
    setNotUpdatedCenter({
      lat: 37.772,
      lng: -122.214,
    });
  };

  // line ploygon 중심값 구하기

  const [NotUpdatedCenter, setNotUpdatedCenter] = useState({
    lat: 37.772,
    lng: -122.214,
  });

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

  // opacity handler
  const [markerOpacity, setMarkerOpacity] = useState(1);
  console.log("markerOpacity: ", markerOpacity);

  const options = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 4,
    clickable: true,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  const [optionState, setOptionState] = useState(options);

  const optionsPolygon = {
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

  const [optionsPolygonState, setOptionsPolygonState] =
    useState(optionsPolygon);

  const [inputValue, setInputValue] = useState(100);
  console.log("inputValue: ", inputValue);

  const [panelHide, setPanelHide] = useState(false);

  return (
    <>
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
                setMarkerOpacity((inputValue / 100).toFixed(1));
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

      <Container2 isHide={panelHide}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            // onZoomChanged={}
            // options={option}
          >
            {position.marker.map((position, index) => (
              <MarkerF
                key={index}
                position={position}
                icon={{
                  url: "https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png",
                  scaledSize: 10,
                  fillOpacity: { markerOpacity },
                }}
                opacity={markerOpacity}
                onClick={() => {
                  markerHandler(position);
                }}
              />
            ))}
            {position.line.map((position, index) => (
              <PolylineF
                key={index}
                path={position}
                options={
                  NotUpdatedCenter === position[0] ? optionState : options
                }
                onClick={() => {
                  polygonHandler(position);
                }}
              />
            ))}

            {position.polygon.map((position, index) => (
              <PolygonF
                key={index}
                path={position}
                options={
                  NotUpdatedCenter === position[0]
                    ? optionsPolygonState
                    : optionsPolygon
                }
                onClick={() => {
                  polygonHandler(position);
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Container2>

      <HidePanelBtn
        isHide={panelHide}
        onClick={() => setPanelHide((prev) => !prev)}
      >
        {panelHide ? ">" : "<"}
      </HidePanelBtn>
    </>
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

const HidePanelBtn = styled.div`
  width: 25px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  top: 45%;
  background-color: white;
  left: ${(props) => (props.isHide ? "0" : "20%")};
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Input = styled.input`
  width: 50%;
`;

const Lines = styled(Points)``;
const Polygons = styled(Points)``;
const Line = styled(Point)``;
const Polygon2 = styled(Point)``;

const Container2 = styled.div`
  width: ${(props) => (props.isHide ? "100%" : "80%")};
  height: 100%;
`;

export default MapGoogle;
