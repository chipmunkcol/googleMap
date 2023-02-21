import { PolygonF } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { pathPolygonState } from "../../../../store/pathPolygon";

const Polygon = ({
  NotUpdatedCenter,
  optionsPolygonState,
  polygonBaseOptions,
  polygonHandler,
}) => {
  const [position, setPosition] = useRecoilState(pathPolygonState);

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
