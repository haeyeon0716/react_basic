/*
	1. 해당ㅇ 페이지를 어떤 식으로 작업했고 어떤 이슈가 있었는지 설명
*/

import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Department, setDepartment] = useState([]);
	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.catch((err)=>console.log(err))
			.then((json) => {
				setDepartment(json.members);
			})
			.catch((err)=>console.log(err));
	}, []);

	return (
		<Layout title={'Department'}>

		<hr />
		<div className="mainbox">
				<article>
                    <div class="pic">
					</div>
                    <div class="txtbox">
                        <h2>Lorem ipsum dolor sit.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, magni.</p>
                    </div>
                </article>
				<article>
                    <div class="pic">
					</div>
                    <div class="txtbox">
                        <h2>Lorem ipsum dolor sit.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, magni.</p>
                    </div>
                </article>
				<article>
                    <div class="pic">
					</div>
                    <div class="txtbox">
                        <h2>Lorem ipsum dolor sit.</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, magni.</p>
                    </div>
                </article>
		</div>
		<div className='container'>
				<div className='infoBox'>
					<h2>Lorem, ipsum.</h2>
				</div>

				<div className='memberBox'>
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
			</div>
			
		</Layout>
	);
}

/*
	답변 

	1. 정적인 데이터라서 굳이 fetch를 통해서 데이터를 가져오지 않고 static 하게 컨텐츠를 집어넣을까 고민도 했지만 
	데이터 기반으로 모든 화면단이 동적으로 생성되게 하고 싶어서 fetch를 통해서 데이터가 변경되더라도 자동으로 화면이 갱신되도록 작업을 했다

	*static : 정적
	*dynamic: 동적
*/