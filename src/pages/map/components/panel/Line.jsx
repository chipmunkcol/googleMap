import { position } from "../../../../store/path";
import * as Styled from "../../Panel"

const Line = ({ NotUpdatedCenter, inputValue, setInputValue, polygonHandler, optionState, setOptionState }) => {

    return (
        <>{position.line.map((latLng, index) => (
            <Styled.Line2
                key={index}
                onClick={() => {
                    polygonHandler(latLng);
                }}
                active={NotUpdatedCenter === latLng[0] ? true : false}
            >
                Line-{index + 1}
                <Styled.Input
                    type="range"
                    value={NotUpdatedCenter === latLng[0] ? inputValue : 100}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    onMouseUp={(e) => {
                        setOptionState({
                            ...optionState,
                            strokeOpacity: e.target.value / 100,
                        });
                    }}
                />
            </Styled.Line2>
        ))}</>
    )
}

export default Line;