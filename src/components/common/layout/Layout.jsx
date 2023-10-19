/*
	1. layout.jsx를 왜 만들었는지 설명
*/
import './Layout.scss';
import { useEffect, useRef } from 'react';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ title, children }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle, 0.1);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);
	
	return (
		<section ref={refFrame} className={`layout ${title}`}>
			<figure>
			{/* <img src={process.env.PUBLIC_URL + 'img/background1.jpg'}/>
			<p>My portfolio site</p> */}
			</figure>

			<div className='content'>
				<h1 ref={refTitle}>{title}</h1>
				<div className='bar'></div>
				{children}
			</div>
		</section>
	);
}

/*
	1. react로 개발하는 프로젝트가 대단위 페이지 이기 때문에 공통적인 틀 안에서 특정 변화점이 생겼을 때 유지보수 하기 편하게 하려고 생성
	-원래 서브 페이지를 따로 만들어서 작업 하고 있었는데 서브페이지 구조를 변경할 일이 생겼고 너무 반복작업이 많아져 구글링을 한 결과 실무작업에서는 반복적인 페이지 패턴을 따로 컴포넌트로 만들어서 달라지는 부분만 props로 전달해서 호출하는 식으로 구현해 봤습니다

	
 */
