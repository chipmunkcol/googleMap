import { useState } from "react";
import { useRecoilState } from "recoil";
import { opacityState } from "../../../../store/opacity";
import { pathState } from "../../../../store/path";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";
import * as Styled from "../../Panel";

const Marker = () => {
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [position, setPosition] = useRecoilState(pathState);
  const [markerOpacity, setMarkerOpacity] = useRecoilState(opacityState);
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
  const [inputValue, setInputValue] = useState(100);

  //변경한 inputValue를 전역 opacityState 에 반영
  const updateOpacity = (e) => {
    setInputValue(e.target.value);
    setMarkerOpacity(Number(inputValue / 100));
  };
  //위의 opacityState를 변경된 객체값에 반영
  const updateOpacityHandler = (latLng) => {
    const index = position?.findIndex((v) => v.path === latLng.path);
    let copy = [];
    position?.map((v, i) => {
      if (index !== i) {
        return copy.push(v);
      } else {
        const update = { ...v, opacity: markerOpacity };
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
              updateOpacity(e);
              updateOpacityHandler(value);
            }}
          />
        </Styled.Point>
      ))}
    </>
  );
};

export default Marker;
