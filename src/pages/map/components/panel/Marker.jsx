import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { opacityState } from "../../../../store/opacity";
import { pathState } from "../../../../store/path";
import * as Styled from "../../Panel";

const Marker = ({
  markerHandler,
  center,
  inputValue,
  setInputValue,
  // markerOpacity,
  // setMarkerOpacity,
}) => {
  const [position, setPosition] = useRecoilState(pathState);
  const [markerOpacity, setMarkerOpacity] = useRecoilState(opacityState);

  const updatePositinHandler = (latLng) => {
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

  // const updateOpacityHandler = (latLng) => {
  //   const index = position?.findIndex((v) => v.path === latLng.path);
  //   let copyArr = [...markerOpacity];
  //   if(index !== -1) {
  //     copyArr[index] = {...copyArr[index],}
  //   }
  // }

  return (
    <>
      {position?.map((value, index) => (
        <Styled.Point
          key={index}
          onClick={() => {
            markerHandler(value.path);
          }}
          active={center === value.path ? true : false}
        >
          Point-{index + 1}
          <Styled.Input
            type="range"
            value={value.opacity * 100}
            onChange={(e) => {
              setInputValue(e.target.value);
              updatePositinHandler(value);
              const op = (inputValue / 100).toFixed(1);
              setMarkerOpacity(Number(op));
            }}
            onMouseUp={() => {
              // const op = (inputValue / 100).toFixed(1);
              // setMarkerOpacity(Number(op));
              // updatePositinHandler(value);
            }}
          />
        </Styled.Point>
      ))}
    </>
  );
};

export default Marker;
