import { useState } from "react";
import { useRecoilState } from "recoil";
import { opacityState } from "../../../../store/opacity";
import { pathLineState } from "../../../../store/pathLine";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";
import * as Styled from "../../Panel";

const Line = () => {
  const [position, setPosition] = useRecoilState(pathLineState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [markerOpacity, setMarkerOpacity] = useRecoilState(opacityState);
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);
  const [inputValue, setInputValue] = useState(100);

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
    setPosition(copy);
  };

  const updateOpacity = (e) => {
    setInputValue(e.target.value);
    setMarkerOpacity(Number(inputValue / 100));
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
              updateOpacity(e);
              updatePositinHandler(value.path);
            }}
          />
        </Styled.Line2>
      ))}
    </>
  );
};

export default Line;
