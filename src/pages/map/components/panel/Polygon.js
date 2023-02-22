import { useState } from "react";
import { useRecoilState } from "recoil";
import { pathPolygonState } from "../../../../store/pathPolygon";
import { polygonPositionState } from "../../../../store/polygonPositionState";
import { positionState } from "../../../../store/positionState";
import { zoomState } from "../../../../store/zoom";
import * as Styled from "../../Panel";

const Polygon = () => {
  const [position, setPosition] = useRecoilState(pathPolygonState);
  const [center, setCenter] = useRecoilState(positionState);
  const [zoom, setZoom] = useRecoilState(zoomState);
  const [NotUpdatedCenter, setNotUpdatedCenter] =
    useRecoilState(polygonPositionState);

  // line polygon 중심값 구하기
  let lat;
  let lng;
  let updatedCenter;
  const polygonHandler = (center) => {
    setNotUpdatedCenter(center[0]); //클릭한 panel active 시켜주기 위한 코드(해당 state를 boolean으로 받고있음)
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
        <Styled.Polygon2
          key={index}
          onMouseDown={() => {
            polygonHandler(value.path);
          }}
          active={NotUpdatedCenter === value.path[0] ? true : false}
        >
          Polygon-{index + 1}
          <Styled.Input
            type="range"
            value={value.opacity * 100}
            onChange={(e) => {
              updatePositinHandler(e, value.path);
            }}
          />
        </Styled.Polygon2>
      ))}
    </>
  );
};

export default Polygon;
