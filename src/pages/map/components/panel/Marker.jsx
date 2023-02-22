import { useRecoilState } from "recoil";
import { pathState } from "../../../../store/path";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";
import * as Styled from "../../Panel";

const Marker = () => {
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [position, setPosition] = useRecoilState(pathState);
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  //panel 클릭 시 Map center & zoom;
  const markerHandler = (center) => {
    setCenter(center);
    setZoom(15);
    // line polygon이랑 active 겹치지 않게 초기값 설정
    setNotUpdatedCenter({ lat: 37.772, lng: -122.214 });
  };

  //oapcity 객체별로 갖게하자
  const updateOpacityHandler = (e, path) => {
    const index = position?.findIndex((v) => v.path === path);
    let copy = [];
    position?.map((v, i) => {
      if (index !== i) {
        return copy.push(v);
      } else {
        const update = { ...v, opacity: Number(e.target.value / 100) };
        return copy.push(update);
      }
    });
    setPosition(copy);
  };

  return (
    <>
      {position?.map((value, index) => (
        <Styled.Point
          key={index}
          onMouseDown={() => {
            markerHandler(value.path);
          }}
          active={center === value.path ? true : false}
        >
          Point-{index + 1}
          <Styled.Input
            type="range"
            value={value.opacity * 100} //이거 캐싱 뭐냐구~
            onChange={(e) => {
              updateOpacityHandler(e, value.path);
            }}
          />
        </Styled.Point>
      ))}
    </>
  );
};

export default Marker;
