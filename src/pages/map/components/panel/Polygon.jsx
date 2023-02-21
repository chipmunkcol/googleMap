import { useRecoilState } from "recoil";
import { pathState } from "../../../../store/path";
import { pathPolygonState } from "../../../../store/pathPolygon";
import * as Styled from "../../Panel";

const Polygon = ({
  NotUpdatedCenter,
  inputValue,
  setInputValue,
  polygonHandler,
  optionsPolygonState,
  setOptionsPolygonState,
  markerOpacity,
  setMarkerOpacity,
}) => {
  const [position, setPosition] = useRecoilState(pathPolygonState);

  const updatePositinHandler = (path) => {
    const index = position?.findIndex((v) => v.path === path);
    let copy = [];
    position?.map((v, i) => {
      if (index !== i) {
        return copy.push(v);
      } else {
        const update = { ...v, opacity: markerOpacity };
        return copy.push(update);
      }
    });
    console.log("@@@@@@@@@@@@@@", copy);
    setPosition(copy);
  };

  return (
    <>
      {position?.map((value, index) => (
        <Styled.Polygon2
          key={index}
          onClick={() => {
            polygonHandler(value.path);
          }}
          active={NotUpdatedCenter === value.path[0] ? true : false}
        >
          Polygon-{index + 1}
          <Styled.Input
            type="range"
            value={value.opacity * 100}
            onChange={(e) => {
              setInputValue(e.target.value);
              updatePositinHandler(value.path);
              const op = (inputValue / 100).toFixed(1);
              setMarkerOpacity(Number(op));
            }}
            onMouseUp={(e) => {}}
          />
        </Styled.Polygon2>
      ))}
    </>
  );
};

export default Polygon;
