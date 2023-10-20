import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const pid = 'PL1BYYyCLf7NdanCUjHVau1ee2D36jh_qM';
	const num = 5;
	const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const { data } = await axios.get(resultURL);
	return data.items;
};

//react-query에는 query key라는 것을 문자열로 자정해서 데이터 호출시 query key가 동일하면 동일한 데이터로 인지해서 refetching 처리 하지 않고 캐싱 되어 있는 데이터를 재활용
//useQuery([쿼리키], fetching함수, 캐싱옵션)

export const useYoutubeQuery = ()=>{
    return useQuery(['youtubeData'], fetchYoutube)
}