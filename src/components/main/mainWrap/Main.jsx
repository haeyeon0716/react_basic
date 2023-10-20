import Btns from '../btns/Btns';
import Info from '../info/Info';
import News from '../news/News';
import Visual from '../visual/Visual';
// import Pics from '../pics/Pics';
import './Main.scss';

function Main() {
	return (
		<main className='mainWrap'>
			<Visual />
			<News />
			{/* <Pics /> */}
			<Info />
			<Btns />
		</main>
	);
}

export default Main;