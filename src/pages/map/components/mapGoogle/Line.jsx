import { PolylineF } from "@react-google-maps/api";
import { useRecoilState } from "recoil";
import { pathLineState } from "../../../../store/pathLine";

const Line = ({
  NotUpdatedCenter,
  optionState,
  lineBaseOptions,
  polygonHandler,
}) => {
  const [position, setPosition] = useRecoilState(pathLineState);

  return (
    <>
      {position?.map((value, index) => (
        <PolylineF
          key={index}
          path={value.path}
          // options={
          //   NotUpdatedCenter === value[0] ? optionState : lineBaseOptions
          // }
          options={{ strokeOpacity: value.opacity }}
          onClick={() => {
            polygonHandler(value.path);
          }}
        />
      ))}
    </>
  );
};

export default Line;
