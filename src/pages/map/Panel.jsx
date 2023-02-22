import styled from "styled-components";
import Marker from "./components/panel/Marker";
import Line from "./components/panel/Line";
import Polygon from "./components/panel/Polygon";

const Panel = ({ panelHide }) => {
  return (
    <Container1 isHide={panelHide}>
      <Points>Points</Points>
      <Marker />

      <Lines>Lines</Lines>
      <Line />

      <Polygons>Polygons</Polygons>
      <Polygon />
    </Container1>
  );
};

const Container1 = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid gray;
  display: ${(props) => (props.isHide ? "none" : "null")};
  transition: 1s;
`;

export const Points = styled.div`
  width: 100%;
  height: 25px;
  padding-left: 10px;
  border-bottom: 1px solid gray;
  background-color: #cccccc;
  display: flex;
  align-items: center;
`;
export const Point = styled.div`
  width: 100%;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${(props) => (props.active ? "bolder" : null)};
  background-color: ${(props) => (props.active ? "yellow" : null)};
`;
export const Input = styled.input`
  width: 50%;
  height: 3px;
  background-color: gray;
  cursor: pointer;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: 2px solid #b0b0b0;
    background-color: white;
    -webkit-appearance: none;
  }
`;

export const Lines = styled(Points)``;
export const Polygons = styled(Points)``;
export const Line2 = styled(Point)``;
export const Polygon2 = styled(Point)``;

export default Panel;
