import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<section className={`layout ${title}`}>
			<figure>
			<img src={process.env.PUBLIC_URL + 'img/background1.jpg'}/>
			<p>My portfolio site</p>
			</figure>

			<div className='content'>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}
