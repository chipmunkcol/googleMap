import styled from "styled-components";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRecoilValue } from "recoil";
import { positionState } from "../../store/positionState";
import Marker from "./components/mapGoogle/Marker";
import Line from "./components/mapGoogle/Line";
import Polygon from "./components/mapGoogle/Polygon";
import { zoomState } from "../../store/zoom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapGoogle = ({ panelHide }) => {
  const center = useRecoilValue(positionState);
  const zoom = useRecoilValue(zoomState);

  return (
    <>
      <Container2 isHide={panelHide}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            options={{ zoom: zoom, center: center }}
          >
            <Marker />

            <Line />

            <Polygon />
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
