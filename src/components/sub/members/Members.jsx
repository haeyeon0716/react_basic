import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState } from 'react';

export default function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		interests: false,
		edu: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Errs, setErrs] = useState({});

	console.log(Errs);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	//체크 하였다가 다시 체크를 해지 하면 false값이 반환되는 것ㅇ을 반지하기 위한 함수
	const handleCheck = (e) => {
		const {name} = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');
		inputs.forEach((input) => input.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	}

	const check = (value) => {
		const num = /[0-9]/; //0-9까지의 모든 값을 정규표현식으로 범위지정
		const txt = /[a-zA-Z]/; //대소문자 구분없이 모든 문자 범위지정
		const spc = /[!@#$%^*()_]/; //모든 특수문자 지정
		const errs = {};

		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}

		//비밀번호 인증 (5글자 이상, 문자, 숫자, 특수문자 모두 포함)
		if (
			value.pwd1.length < 5 ||
			!num.test(value.pwd1) ||
			!txt.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자이상, 문자,숫자,특수문자를 모두 포함하세요';
		}

		//비밀번호 재확인 인증
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요.';
		}

		//이메일 인증
		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일은 무조건 @를 포함해야 합니다.';
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '이메일에 @앞뒤로 문자값이 있어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}

		//성별인증
		if (!value.gender) {
			errs.gender = '성별은 필수 체크 항목입니다.';
		}

		//관심사 인증
		if (!value.interests) {
			errs.interests = '관심사를 하나이상 체크해주세요.';
		}

		//학력 인증
		if (!value.edu) {
			errs.edu = '학력을 선택하세요.';
		}

		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('인증통과');
		} else {
			setErrs(check(Val));
		}
	};

	return (
		<Layout title={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>userid</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										value={Val.userid}
										onChange={handleChange}
									/>
									{Errs.userid && <p>{Errs.userid}</p>}
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd1'
										name='pwd1'
										value={Val.pwd1}
										onChange={handleChange}
									/>
									{Errs.pwd1 && <p>{Errs.pwd1}</p>}
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>re-password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd2'
										name='pwd2'
										value={Val.pwd2}
										onChange={handleChange}
									/>
									{Errs.pwd2 && <p>{Errs.pwd2}</p>}
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>e-mail</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										onChange={handleChange}
									/>
									{Errs.email && <p>{Errs.email}</p>}
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th>gender</th>
								<td>
									<label htmlFor='female'>female</label>
									<input
										type='radio'
										name='gender'
										id='female'
										onChange={handleRadio}
									/>

									<label htmlFor='male'>male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										onChange={handleRadio}
									/>
									{Errs.gender && <p>{Errs.gender}</p>}
								</td>
							</tr>

							{/* interest */}
							<tr>
								<th>interest</th>
								<td>
									<label htmlFor="sports">sports</label>
									<input type="checkBox" id='sports' name='interests' onChange={handleCheck} />

									<label htmlFor="music">music</label>
									<input type="checkBox" id='music' name='interests' onChange={handleCheck} />

									<label htmlFor="game">game</label>
									<input type="checkBox" id='game' name='interests' onChange={handleCheck} />
									{Errs.interests && <p>{Errs.interests}</p>}
								</td>
							</tr>

							{/* education */}
							<tr>
								<th>
									<label htmlFor="edu">Education</label>
								</th>
								<td>
									<select name="edu" id="edu" onChange={handleChange}>
										<option value="">최종학력 선택하세요</option>
										<option value="element-school">초등학교 졸업</option>
										<option value="high-school">고등학교 졸업</option>
										<option value="collage">대학교 졸업</option>
									</select>
									{Errs.edu && <p>{Errs.edu}</p>}
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}