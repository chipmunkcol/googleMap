import styled from "styled-components";
import MapGoogle from "./MapGoogle";
import Panel from "./Panel";

const IndexMap = () => {
  return (
    <Wrap>
      <MapGoogle />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export default IndexMap;
