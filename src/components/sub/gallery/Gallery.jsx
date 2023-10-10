import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';
//masonry import
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const api_key = '2a1a0aebb34012a99c23e13b49175343';
	const method_interest = 'flickr.interestingness.getList';
	const num = 50;
	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

	useEffect(() => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.photos.photo);
				setPics(json.photos.photo);
			});
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='picFrame'>
				{/* 반복 도는 article요소를 Masonry로 wrapping후 세팅 */}
				<Masonry
					elementType={'div'} //Masonry컴포넌트가 변환될 태그명 지정
					options={{ transitionDuration: '0.5s' }} //박스모션시 transition 시간 설정
					disableImagesLoaded={false} //true이미지로딩처리 안함
					updateOnEachImageLoad={false} //true각 이미지의 로딩처리 안함
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt={data.owner}
										/>
										<span>{data.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}