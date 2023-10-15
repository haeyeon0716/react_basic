import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Youtube.scss';
import { useEffect, useState } from 'react';

export default function Youtube() {
	const [Youtube, setYoutube] = useState([]);
	const [IsModal, setIsModal] = useState(false);
	const [Index, setIndex] = useState(0);

	//async await로 동기화 코드를 좀더 깔끔하게 정리
	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const pid = 'PL1BYYyCLf7NdanCUjHVau1ee2D36jh_qM';
		const num = 5;
		const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		// async await 사용
		const data = await fetch(resultURL)
		const json = await data.json()
	
		setYoutube(json.items);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Layout title={'Youtube'}>
				<div className="txt">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis deleniti praesentium totam temporibus distinctio, 
					<br />
					asperiores dolorum qui at earum vitae exercitationem adipisci incidunt sunt, unde expedita ipsum cupiditate tempora odit!
					<br />
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet velit fugit tenetur vero consequatur vel neque, dolore ex optio deserunt,
					<br />
					voluptatibus, id non labore explicabo error totam! Illo, itaque id, culpa dolore perferendis libero est magnam a ipsa, aut distinctio.
				</div>


				<div className="Box">
				<hr />
					<div className="box">
						<h2>Lorem, ipsum.</h2>
						<br />
						<span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id obcaecati quaerat et perspiciatis cupiditate ipsum possimus quidem alias itaque ex.</span>
						<button>More view</button>
					</div>
					<div className="box">
						<h2>Lorem, ipsum.</h2>
						<br />
						<span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id obcaecati quaerat et perspiciatis cupiditate ipsum possimus quidem alias itaque ex.</span>
						<button>More view</button>

					</div>
					<div className="box">
						<h2>Lorem, ipsum.</h2>
						<br />
						<span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id obcaecati quaerat et perspiciatis cupiditate ipsum possimus quidem alias itaque ex.</span>
						<button>More view</button>

					</div>
				</div>
				{Youtube.map((data, idx) => {
					let tit = data.snippet.title;
					let desc = data.snippet.description;
					let date = data.snippet.publishedAt;

					return (			
						<article key={idx}>
							{/* titbox */}
							<div className="conbox">
							<p>{desc.length > 180 ? desc.substr(0, 180) + '...' : desc}</p>
							<span>{date.split('T')[0].split('-').join('.')}</span>
							</div>

							<div
								className='pic'
								onClick={() => {
									setIndex(idx);
									setIsModal(true);
								}}
							>
								<img
									src={data.snippet.thumbnails.standard.url}
									alt={data.title}
								/>
							</div>
						</article>
					);
				})}
			</Layout>

			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<iframe
						src={`https://www.youtube.com/embed/${Youtube[Index].snippet.resourceId.videoId}`}
						title='youtube'
					></iframe>
				</Modal>
			)}
		</>
	);
}

/*
	리액트는 단방향 데이터 바인딩
	- 부모에서 자식으로 데이터 전달가능하지만 자식에서 부모로는 데이터를 전달 불가
	- props전달, children 전달
	
	리액트에서 자식 컴포넌트에서는 직접적으로 부모 컴포넌트의 state값 변경이 불가
	- 해결방법 부모의 state변경함수를 자식 컴포넌트로 전달
	- 자식컴포넌트에서는 전달받은 state변경함수로 간접적으로 부모 state값 변경가능

	Promise .then구문을 좀 더 구조적으로 짜는 방법 (async await) = then 구문 사용할 필요 없음
	async await 사용조건
	-- promise반환 함수를 wrapping 처리
	-- wrapping 된 함수에 async 적용
	-- promise 반환함수 앞쪽에 await적용
	-- await 적용되어있는 다음 코드가 무조건 동기화 처리 = 순서대로 실행이 됨
*/