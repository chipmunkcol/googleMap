import { useRecoilState } from "recoil";
import { pathLineState } from "../../../../store/pathLine";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";
import * as Styled from "../../Panel";

const Line = () => {
  const [position, setPosition] = useRecoilState(pathLineState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  // line polygon 중심값 구하기
  let updatedCenter;
  let lat;
  let lng;
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

  // oapcity 객체별로 갖게하자
  const updatePositinHandler = (e, path) => {
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
        <Styled.Line2
          key={index}
          onMouseDown={() => {
            polygonHandler(value.path);
          }}
          active={NotUpdatedCenter === value.path[0] ? true : false}
        >
          Line-{index + 1}
          <Styled.Input
            type="range"
            value={value.opacity * 100}
            onChange={(e) => {
              updatePositinHandler(e, value.path);
            }}
          />
        </Styled.Line2>
      ))}
    </>
  );
};

export default Line;
