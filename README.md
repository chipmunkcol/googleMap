## react-google-maps/api \_prac

### 후기

    - docs 업데이트가 잘 안되어있어 사용하기 굉장히 불편함.
    프로젝트 진행 하다가 kakao 같은 docs 잘되어있는 api로 변경 가능성 있음

### History

1. google map api 설치

   - @react-google-maps/api

2. 지도에 marker 찍기

   - <MarkerF
     position={position}
     icon={{
               url: 이미지URL,
               scaledSize: { height: 30, width: 30 },
           }}
     options={{ opacity: 1 }} // marker option 넣기 개빡침
     />

3. 지도에 line 긋기

   - <PolylineF 
           options={lineBaseOptions}
           />

     const lineBaseOptions = {
     fillColor: "lightblue",
     fillOpacity: 1,
     strokeColor: "red",
     strokeOpacity: 1,
     strokeWeight: 4,
     clickable: true,
     draggable: false,
     editable: false,
     geodesic: false,
     zIndex: 1,
     };

4. 지도에 polygon 효과

   - <PolygonF
           options={polygonBaseOptions}
           />

     const polygonBaseOptions = {
     fillColor: "lightblue",
     fillOpacity: 1,
     strokeColor: "black",
     strokeOpacity: 1,
     strokeWeight: 2,
     clickable: true,
     draggable: false,
     editable: false,
     geodesic: false,
     zIndex: 1,
     };

5. component 하나에 다 넣으니 내가 불편해서 리팩토링중
   - recoil로 state 관리
