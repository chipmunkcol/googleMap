import { useState } from "react";
import styled from "styled-components";
import HidePanelBtn from "./components/HidePanelBtn";
import MapGoogle from "./MapGoogle";
import Panel from "./Panel";

const IndexMap = () => {

  const [panelHide, setPanelHide] = useState(false);

  return (
    <Wrap>
      <Panel panelHide={panelHide} />
      <MapGoogle panelHide={panelHide} />
      <HidePanelBtn panelHide={panelHide} setPanelHide={setPanelHide} />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export default IndexMap;
