import { MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { pathState } from "../../../../store/path";

const Marker = ({ center, markerOpacity, markerHandler }) => {
  const [position, setPosition] = useRecoilState(pathState);
  console.log("Mapposition: ", position);

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
