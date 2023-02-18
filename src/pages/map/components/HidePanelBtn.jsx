import styled from "styled-components";

const HidePanelBtn = ({ panelHide, setPanelHide }) => {
    return (
        <HideBtn
            isHide={panelHide}
            onClick={() => setPanelHide((prev) => !prev)}
        >
            {panelHide ? ">" : "<"}
        </HideBtn>
    )
}

const HideBtn = styled.div`
  width: 25px;
  height: 40px;
  border: 1px solid gray;
  position: absolute;
  top: 45%;
  background-color: white;
  left: ${(props) => (props.isHide ? "0" : "20%")};
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default HidePanelBtn;