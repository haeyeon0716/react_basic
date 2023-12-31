import { useRef, useEffect } from 'react';
import './Pics.scss';

function Pics() {
	const frame = useRef(null);
	const box = useRef(null);

	const handleScroll = () => {
		const pos = frame.current.offsetTop;
		let scroll = window.scrollY;

		//해당 스크롤 값이 Pics영역에 도달 했을 때 0으로 보정 해 놓은 값
		let scroll2 = scroll - pos;

		//frame.current.style.height = window.innerWidth * 4 + 'px';

		//가로 스크롤 wrapping 섹션 안에 들어왔을때
		if (
			scroll >= pos &&
			scroll < pos + frame.current.clientHeight - window.innerWidth
		) {
			console.log('활성화영역 안쪽으로 들어옴');
			box.current.style.position = 'fixed';
			box.current.style.left = -scroll2 + 'px';
			box.current.style.top = '0px';
			//활성화 영역 스크롤 아래쪽으로 벗어났을떄
		} else if (scroll >= pos + frame.current.clientHeight - window.innerWidth) {
			console.log('활성화 섹션 아래쪽으로 벗어남');
			box.current.style.position = 'absolute';
			box.current.style.top =
				frame.current.clientHeight - window.innerWidth + 'px';
			box.current.style.left = -window.innerWidth * 3 + 'px';
			//활성화 영역 스크롤 위쪽으로 벗어났을때
		} else {
			console.log('활성화 영역 위쪽으로 벗어남');
			box.current.style.position = 'absolute';

			box.current.style.top = '0px';
			box.current.style.left = '0px';
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		// return () => {
		// 	window.removeEventListener('scroll', handleScroll);
		// };
	}, []);
	return (
		//스크롤이 해당 pics영역에 도달하게 되면 Pics 안쪽의 article 프레임을 position absolute에  position: fixed로 속성 변경
		//article브라우저단에 세로 0px 위치로 고정이 되면서 마치 가로로 스크롤이 움직이는 것 같은 효과 구현
		//Pics영역을 스크롤이 벗어나면 다시 absolute속성으로 변경해서 다시 위쪽으로 움직이도록 배치
		<section className='myScroll pics' ref={frame}>
			<article ref={box}>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
			</article>
		</section>
	);
}

export default Pics;