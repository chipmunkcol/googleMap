import styled from "styled-components";
import { position } from "../../store/path";
import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
  PolygonF,
} from "@react-google-maps/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { positionState } from "../../store/positionState";
import { polygonPositionState } from "../../store/polygonPositionState";
import { lineOption, lineBaseOptions } from "../../store/lineOption";
import { polygonOption, polygonBaseOptions } from "../../store/polygonOption";
import { opacity } from "../../store/opacity";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapGoogle = ({ panelHide }) => {

  const [center, setCenter] = useRecoilState(positionState)

  // const [center, setCenter] = useState({
  //   lat: 37.772,
  //   lng: -122.214,
  // });

  const markerHandler = (center) => {
    setCenter(center);
    setNotUpdatedCenter({
      lat: 37.772,
      lng: -122.214,
    });
  };

  // line ploygon 중심값 구하기
  const [NotUpdatedCenter, setNotUpdatedCenter] = useRecoilState(polygonPositionState)
  // const [NotUpdatedCenter, setNotUpdatedCenter] = useState({
  //   lat: 37.772,
  //   lng: -122.214,
  // });

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
  const markerOpacity = useRecoilValue(opacity);

  const optionState = useRecoilValue(lineOption);

  const optionsPolygonState =
    useRecoilValue(polygonOption)

  return (
    <>
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
                  scaledSize: { height: 30, width: 30 },
                }}
                options={{ opacity: center === position ? markerOpacity : 1 }}
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
                  NotUpdatedCenter === position[0] ? optionState : lineBaseOptions
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
                    : polygonBaseOptions
                }
                onClick={() => {
                  polygonHandler(position);
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Container2>


    </>
  );
};

const Container2 = styled.div`
  width: ${(props) => (props.isHide ? "100%" : "80%")};
  height: 100%;
`;

export default MapGoogle;
