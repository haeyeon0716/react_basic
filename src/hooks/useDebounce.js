import { useState, useRef } from 'react';

//해당 hook의 인수 값으로 특정 값을 전달ㄹ 받아서
//해닫 값을 또다른 state에 옮겨 담아줌
//내부적으로 0.5초 안에 state변경이 일어나면 setTimeout의 return값을 초기화 시키면서 재이벤트 방지
//결과적으로 0.5초 안에 계속 특정 값이 변경되고 있으면 state변경을 holding하고 있다가 값 변경 후 0.5초가 지나야지만 state값을 갱신
export const useDebounce = (value) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const blocker = useRef(null);

	clearTimeout(blocker.current);

	blocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, 500);

	return DebouncedVal;
};