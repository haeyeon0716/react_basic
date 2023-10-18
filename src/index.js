import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import menuReducer from './redux/menuSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
	},
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	1. CSR 방식에 대해서 설명하시오
	-- Client Side Rendering 
	-- 예전 SSR방식은 각 페이지마다 html파일을 직접 만들어 놓은 뒤 사용자가 url입력시 직접 서버에서 각각의 HTML 파일을 불러와서 렌더링 하는 방식
	-- 사용자가 브라우저에 url입력해서 페이지 요청하면 빈 HTML 파일만 서버쪽에서 가져오고 그와 동시에 jsx를 반환하는 리엑트 컴포넌트 파일을 	같이 불러옴
	-- 리액트 컴포넌트가 모두 동작되면 빈 HTML문서에 동적으로 모든 컴포넌트가 렌더링됨 
	-- 초기 모든 서브페이지에 대한 파일들을 모두 가져와서 url요청에 따라 미리 가져온 리액트 컴포넌트를 바꾸면서 화면을 변경


	2. ssr방식에 비해 csr방식의 장점과 단점에 대해서 설명
	-- 초기 로딩속도가 SSr방식에 비해서는 오래 걸림
	-- 처음에 빈 HTML파일을 가져오고 모든 리액트 컴포넌트가 마운트되기 전 까지는 사용자는 빈 화면을 봐야함
	    = 검색 엔진에 안좋음
	-- 해결 방법 : NEXT.js라는 framework을 이용해서 SSR과 CSR방식이 결합된 hydration을 활용
	-- 해경방식 index.html을 불러오고 동적인 리액트 컴포넌트 마운트 되기 전까지 static 데이터를 미리 출력해서 검색엔진 최적화


	2. react프로젝트에서 public, src 폴더를 통해서 어떤 식으로 빌드 되면서 화면이 렌더링 되는지
	-- Server Side Rendering
	-- index.js를 구동파일로 해서 App.js에 있는 모든 컴포넌트를 불러온 다음에 내부적으로 내장되어있는 web pack이라는 번들러에 의해서 하나의 js파일로 번들링 ( 하나로 합쳐짐 ) 번들링된 파일이 index.js에 의해서 public폴더 안에 있는 index.html에 합치면서 최종빌드가 완료됨
	-- 그럼 브라우저에서는 빌드 완료된 index.html을 읽어서 화면 렌더링
*/
