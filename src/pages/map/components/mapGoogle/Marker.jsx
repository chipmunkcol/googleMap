import { MarkerF } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { pathState } from "../../../../store/path";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";

const Marker = () => {
  const [position, setPosition] = useRecoilState(pathState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  // line ploygon 중심값 구하기
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  const markerHandler = (center) => {
    setCenter(center);
    setZoom(15);
    setNotUpdatedCenter({
      lat: 37.772,
      lng: -122.214,
    });
  };

  return (
    <>
      {position?.map((value, index) => (
        <MarkerF
          key={index}
          position={value?.path}
          icon={{
            url: "https://cdn.icon-icons.com/icons2/317/PNG/512/map-marker-icon_34392.png",
            scaledSize: { height: 30, width: 30 },
          }}
          options={{ opacity: value.opacity }}
          onClick={() => {
            markerHandler(value);
          }}
        />
      ))}
    </>
  );
};

export default Marker;
