import styled from "styled-components";
import { position } from "../../store/path";

const Panel = ({ markerHandler }) => {
  return (
    <Container>
      <Points>Points</Points>
      {position.marker.map((value, index) => (
        <Point
          onClick={() => {
            markerHandler(value);
          }}
        >
          Point-{index + 1}
        </Point>
      ))}
      <Lines>Lines</Lines>
      <Line>Line-1</Line>
      <Polygons>Polygons</Polygons>
      <Polygon>Polygon-1</Polygon>
    </Container>
  );
};

const Container = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid gray;
`;

const Points = styled.div`
  width: 100%;
  height: 25px;
  padding-left: 10px;
  border-bottom: 1px solid gray;
  background-color: #cccccc;
  display: flex;
  align-items: center;
`;
const Point = styled.div`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
`;

const Lines = styled(Points)``;
const Polygons = styled(Points)``;
const Line = styled(Point)``;
const Polygon = styled(Point)``;

export default Panel;
