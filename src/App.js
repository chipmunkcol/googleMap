import styled from "styled-components";
import IndexMap from "./pages/map/IndexMap";

function App() {
  return (
    <Wrap>
      <IndexMap />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
`;

export default App;
