## react-google-maps/api \_prac

### 후기

    - docs 업데이트가 잘 안되어있어 사용하기 굉장히 불편함.
    프로젝트 진행 하다가 kakao 같은 docs 잘되어있는 api로 변경 가능성 있음

### History

1. google map api 설치

   - @react-google-maps/api

2. 지도에 marker 찍기

```
   - <MarkerF
     position={position}
     icon={{
               url: 이미지URL,
               scaledSize: { height: 30, width: 30 },
           }}
     options={{ opacity: 1 }} // marker option 넣기 개빡침
     />
```

3. 지도에 line 긋기

```
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
```

4. 지도에 polygon 효과

```
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
```

5. component 하나에 다 넣으니 내가 불편해서 리팩토링중

   - recoil로 state 관리
   - 랜더링 고려해 전역 state는 각 컴포넌트안에서 호출
   - 폴더구조변경

</br>

6. 👩‍💻트러블슈팅
<details>
<summary>panel 객체별로 opacity 조정하는 로직</summary>

생각보다 까다로웠음..

```
<input
type="range"
onchange={(e)=> updateOpacityHandler(e, path);}
/>
input 변경 값을 해당 객체 opacity에 반영해주었음

const updateOpacityHandler = (e, path) => {
const index = position?.findIndex((v) => v.path === path);
let copy = [];
position?.map((v, i) => {
if (index !== i) {
return copy.push(v);
} else {
const update = { ...v, opacity: e.target.value }; // useState 비동기인거 잊지말자.. input 값 바로 받아서 넣어서 버그 해결
return copy.push(update);
}
});
setPosition(copy);
};
```

</details>

</br>

- 컴포넌트 쪼개서 전역 state 호출할때 충분히 고민 안하고 막 하니까 나중에 똥같은 코드들이 많이 생겼다.
- 태그간에 숨겨진 값들 불러오는 ctrl + space 정말 꿀이다
