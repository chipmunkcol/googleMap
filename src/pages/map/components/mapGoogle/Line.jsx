import { PolylineF } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { pathLineState } from "../../../../store/pathLine";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";

const Line = () => {
  const [position, setPosition] = useRecoilState(pathLineState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);

  // line ploygon 중심값 구하기
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  let lat;
  let lng;
  let updatedCenter;
  const polygonHandler = (center) => {
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
    setCenter(updatedCenter);
  };

  return (
    <>
      {position?.map((value, index) => (
        <PolylineF
          key={index}
          path={value.path}
          options={{ strokeOpacity: value.opacity }}
          onClick={() => {
            polygonHandler(value.path);
          }}
        />
      ))}
    </>
  );
};

export default Line;
