import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../../redux/flickrSlice';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector((store) => store.flickr.data);
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const [ActiveURL, setActiveURL] = useState('');
	const [IsUser, setIsUser] = useState(true);
	const [IsModal, setIsModal] = useState(false);
	const my_id = '164021883@N04';

	//submit이벤트 발생시 실행할 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUser(false);

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}

		dispatch(fetchFlickr({ type: 'search', tags: refInput.current.value }));
		refInput.current.value = '';
	};

	//myGallery 클릭 이벤트 발생시 실행할 함수
	const handleClickMy = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'user', id: my_id }));
	};

	//Interest Gallery 클릭 이벤트 발생시 실행할 함수
	const handleClickInterest = (e) => {
		setIsUser(false);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'interest' }));
	};

	//profile 아이디 클릭시 실행할 함수
	const handleClickProfile = (e) => {
		if (IsUser) return;
		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
		setIsUser(true);
	};

	return (
		<>
			<Layout title={'Gallery'}>
				<div className="Box">
				<div className="txtBox">
					<h2>Lorem, ipsum.</h2>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deserunt quasi, enim repellendus consequuntur optio dicta impedit, soluta ex exercitationem blanditiis, est voluptas eius eum temporibus praesentium possimus porro aut.
				</div>
				<div className="txtBox">
					<h2>Lorem, ipsum.</h2>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deserunt quasi, enim repellendus consequuntur optio dicta impedit, soluta ex exercitationem blanditiis, est voluptas eius eum temporibus praesentium possimus porro aut.
				</div>
				<div className="txtBox">
					<h2>Lorem, ipsum.</h2>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deserunt quasi, enim repellendus consequuntur optio dicta impedit, soluta ex exercitationem blanditiis, est voluptas eius eum temporibus praesentium possimus porro aut.
				</div>
				</div>
				<hr />
			<div className="totalBox">
				<div className="exBox">
					<h2>Lorem, ipsum dolor.</h2>
					<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste expedita obcaecati minima aspernatur ducimus distinctio aut autem doloremque quidem nobis voluptatum, dolore quisquam, magnam quibusdam perferendis? Voluptatum dicta quo magnam, placeat dolorem culpa voluptatem dolores cum aliquam ea nobis ullam impedit enim quidem totam quibusdam accusantium debitis quas autem. Nostrum assumenda explicabo natus architecto! Neque maiores nesciunt accusamus nemo? Fugiat, voluptatibus rem ab ex vitae reiciendis error qui illo quisquam.</span>
				</div>

				<div className="imgBox">
				<img src={process.env.PUBLIC_URL + 'img/background2.jpg'}/>
				</div>
			</div>
			<hr />
			<div className="totalBox">
				<div className="imgBox">
				<img src={process.env.PUBLIC_URL + 'img/bg4.jpg'}/>
				</div>

				<div className="exBox">
					<h2>Lorem, ipsum dolor.</h2>
					<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste expedita obcaecati minima aspernatur ducimus distinctio aut autem doloremque quidem nobis voluptatum, dolore quisquam, magnam quibusdam perferendis? Voluptatum dicta quo magnam, placeat dolorem culpa voluptatem dolores cum aliquam ea nobis ullam impedit enim quidem totam quibusdam accusantium debitis quas autem. Nostrum assumenda explicabo natus architecto! Neque maiores nesciunt accusamus nemo? Fugiat, voluptatibus rem ab ex vitae reiciendis error qui illo quisquam.</span>
				</div>
			</div>
			
				<div className='searchBox'>
					<form onSubmit={handleSubmit}>
						<input
							ref={refInput}
							type='text'
							placeholder='검색어를 입력하세요'
						/>
						<button>검색</button>
					</form>
				</div>

				<div className='btnSet' ref={refBtnSet}>
					<button className='on' onClick={handleClickMy}>
						My Gallery
					</button>

					<button onClick={handleClickInterest}>Interest Gallery</button>
				</div>

				<div className='picFrame'>
					<Masonry
						elementType={'div'}
						options={{ transitionDuration: '0.5s' }}
						disableImagesLoaded={false}
						updateOnEachImageLoad={false}
					>
						{Pics.map((data, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<img
											className='pic'
											src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
											alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
											onClick={(e) => {
												setActiveURL(e.target.getAttribute('alt'));
												setIsModal(true);
											}}
										/>
										<h2>{data.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={handleClickProfile}>{data.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}


/*
	클릭한 버튼을 또 클릭했을 때 같은 데이터를 불필요하게 또 다시 fetching 요청하지 않도록
	클릭한 버튼에 on이 붙어 있을 때 함수 호출을 강제 중지

	현재 출력되는 갤러리 방식이 User type갤러리 일 때 같은 사용자의 갤러리가 보이는 형태이므로
	사용자 아이디를 클릭하게 되면 같은 데이터 요청을 보내게 됨

	--- 사용자 타입의 갤러리를 호출 할 때마다 IsUser State값을 true로 변경해서 
	----이벤트가 발생 할 때마다 IsUser값이 true 사용자 아이디 클릭 이벤트 핸들러 제거
*/ 
