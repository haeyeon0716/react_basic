//Layout 컴포넌트를 불러옴 ../../ 구문은 부모 디렉터리로 이동하기 위해 사용됨
import Layout from '../../common/layout/Layout';
//데이터가 다 받아지고 useState로 state에 해당 담아줌
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Department, setDepartment] = useState([]);

	//UseEffect 컴포넌트 마운트 되자마자 fetch로 외부데이터를 가져온다
	//마운트 : 컴포넌트가 화면에 나타나는 것
	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setDepartment(json.members);
			});
	}, []);

	return (
		<Layout title={'Department'}>
			<div className='memberBox'>
				{/* return 문 안쪽에 state값 map으로 반복 돌며 JSX를 출력한다 */}
				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

/*
1. hook의 개념
-- 리액트에서는 크게 두가지 종류의 파일이 존재 
--- 컴포넌트 (화면에 가상돔을 렌더링하는 JSX를 무조건 리턴)
--- hook (JSX로 리턴하는 것이 아닌 각 컴포넌트마다 자주쓰는 기능의 함수나 특정값을 리턴하는 기능파일)



2. UseState, UseEffect, UseRef 하는일 (리액트에서 제일 많이 쓰는 기본 hook)
-- Usestate: 화면에 렌더링 담당하는 중요한 정보를 담아주고 변경해주는 기능의 hook (state가 변경되면 컴포넌트는 재호출되면서 화면 재랜더링)
-- UseEffect: 컴포넌트의 생성, 변경, 소멸시마다 (컴포넌트의 생명주기마다) 특정ㅇ 구문을 호출할 수 있는 hook
-- UseRef: 참조객체에 실시간으로 특정정보값 담기 위한 hook (해당 렌더링 사이클에서 최신 가상돔을 담을 때, 특정 값을 담아 두고 변경 할 때 컴포넌트를 재랜더링 하고 싶지 않을 때 (주로 motion작업))



3. 컴포넌트가 하는 일 (JSX)
-- 자바스크립트로 동적 돔을 만들 때 편의성을 위해 HTML형식을 따와서 편하게 동적돔 형성을 위한 리액트만의 편의기능

4. fetch 문을 UseEffect안쪽에서 호출하는 이유
-- 가상돔 생성은 리액트 기반의 스크립트가 처리 해주지만 외부데이터를 가져오는 것은 web api(브라우저) 가 처리하기 때문에 컴포넌트가 실제 브라우저 상에 마운트가 되고 브라우저가 작업 준비가 돼야지만 fetch를 실행할 수 있기 때문에
-- UseEffect 컴포넌트가 마운트 되어야지만 CSR방식으로 외부데이터 가져올 수 있음



컴포넌트 작성순서 
--1. import로 외부 모듈, 컴포넌트 불러오기

export default function 컴포넌트 이름 (){
	필요시 hook 호출 (hook안에서 hook 호출 불가, handler함수 안쪽에서 hook호출 불가)

	필요시 handler함수 정의

	useEffect(()=>{
		handler 함수 호출 (fetch, 이벤트연결)
	})

	return JSX
}

fetch ES6에서 기본문법으로 포함된 동기적으로 외부 데이터를 가져오는 내장 함수
-- fetch는 promise반환
-- promisee가 반환돼야 .then구문 호출가능
-- .then구문을 호춣야지만 동기적으로 다음코드 실행가능

JSON ( javascript Object Notation ) = 자바스크립트 객체 표현식
-- 자바스크립트의 객체를 문자열 형태로 관리하는 데이터 형식
-- 문자형식으로 되어있는 JSON은 다시 객체형식으로 변환 (parsing)
*/