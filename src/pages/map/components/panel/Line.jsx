import { useRecoilState } from "recoil";
import { opacityState } from "../../../../store/opacity";
import { pathState, position } from "../../../../store/path";
import { pathLineState } from "../../../../store/pathLine";
import * as Styled from "../../Panel";

const Line = ({
  NotUpdatedCenter,
  inputValue,
  setInputValue,
  polygonHandler,
  optionState,
  setOptionState,
  markerOpacity,
  setMarkerOpacity,
}) => {
  const [position, setPosition] = useRecoilState(pathLineState);
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
        <Styled.Line2
          key={index}
          onClick={() => {
            polygonHandler(value.path);
          }}
          active={NotUpdatedCenter === value.path[0] ? true : false}
        >
          Line-{index + 1}
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
        </Styled.Line2>
      ))}
    </>
  );
};

export default Line;
