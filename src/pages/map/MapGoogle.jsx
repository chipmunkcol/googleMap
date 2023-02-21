import styled from "styled-components";
import { pathState, position } from "../../store/path";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { positionState } from "../../store/positionState";
import { polygonPositionState } from "../../store/polygonPositionState";
import { lineOption, lineBaseOptions } from "../../store/lineOption";
import { polygonOption, polygonBaseOptions } from "../../store/polygonOption";
import { opacity, opacityState } from "../../store/opacity";
import Marker from "./components/mapGoogle/Marker";
import Line from "./components/mapGoogle/Line";
import Polygon from "./components/mapGoogle/Polygon";
import { zoomState } from "../../store/zoom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapGoogle = ({ panelHide }) => {
  const [position, setPosition] = useRecoilState(pathState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  console.log("zoom: ", zoom);

  const markerHandler = (center) => {
    setCenter(center);
    setZoom(15);
    setNotUpdatedCenter({
      lat: 37.772,
      lng: -122.214,
    });
  };

  // line ploygon 중심값 구하기
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  let updatedCenter;
  let lat;
  let lng;
  const polygonHandler = (center) => {
    console.log("center: ", center);
    setNotUpdatedCenter(center[0]);
    setZoom(15);
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
  const markerOpacity = useRecoilValue(opacityState);

  const optionState = useRecoilValue(lineOption);

  const optionsPolygonState = useRecoilValue(polygonOption);

  return (
    <>
      <Container2 isHide={panelHide}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            options={{ zoom: zoom, center: center }}
          >
            <Marker
              position={position}
              center={center}
              markerOpacity={markerOpacity}
              markerHandler={markerHandler}
            />

            <Line
              position={position}
              NotUpdatedCenter={NotUpdatedCenter}
              optionState={optionState}
              lineBaseOptions={lineBaseOptions}
              polygonHandler={polygonHandler}
            />

            <Polygon
              position={position}
              NotUpdatedCenter={NotUpdatedCenter}
              optionsPolygonState={optionsPolygonState}
              polygonBaseOptions={polygonBaseOptions}
              polygonHandler={polygonHandler}
            />
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
