
import { position } from "../../../../store/path";
import * as Styled from "../../Panel"

const Polygon = ({ NotUpdatedCenter, inputValue, setInputValue, polygonHandler, optionsPolygonState, setOptionsPolygonState }) => {
    return (
        <>
            {position.polygon.map((latLng, index) => (
                <Styled.Polygon2
                    key={index}
                    onClick={() => {
                        polygonHandler(latLng);
                    }}
                    active={NotUpdatedCenter === latLng[0] ? true : false}
                >
                    Polygon-{index + 1}
                    <Styled.Input
                        type="range"
                        value={NotUpdatedCenter === latLng[0] ? inputValue : 100}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onMouseUp={(e) => {
                            setOptionsPolygonState({
                                ...optionsPolygonState,
                                fillOpacity: e.target.value / 100,
                            });
                        }}
                    />
                </Styled.Polygon2>
            ))}
        </>
    )
}

export default Polygon;