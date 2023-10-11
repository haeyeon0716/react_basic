
//Layout 컴포넌트를 불러옴 ../../ 구문은 부모 디렉터리로 이동하기 위해 사용됨
import Layout from '../../common/layout/Layout';
//2.데이터가 다 받아지고 useState로 state에 해당 담아줌
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