import { PolygonF } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { pathPolygonState } from "../../../../store/pathPolygon";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";

const Polygon = () => {
  const [position, setPosition] = useRecoilState(pathPolygonState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  let lat;
  let lng;
  let updatedCenter;
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

  return (
    <>
      {position?.map((value, index) => (
        <PolygonF
          key={index}
          path={value.path}
          options={{ fillOpacity: value.opacity }}
          onClick={() => {
            polygonHandler(value.path);
          }}
        />
      ))}
    </>
  );
};

export default Polygon;
