import { position } from "../../../../store/path";
import * as Styled from "../../Panel"

const Marker = ({ markerHandler, center, inputValue, setInputValue, setMarkerOpacity }) => {

    return (
        <>
            {position.marker.map((latLng, index) => (
                <Styled.Point
                    key={index}
                    onClick={() => {
                        markerHandler(latLng);
                    }}
                    active={center === latLng ? true : false}
                >
                    Point-{index + 1}
                    <Styled.Input
                        type="range"
                        value={center === latLng ? inputValue : 100}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onMouseUp={() => {
                            const op = (inputValue / 100).toFixed(1);
                            setMarkerOpacity(Number(op));
                        }}
                    />
                </Styled.Point>
            ))}
        </>
    )
}

export default Marker;