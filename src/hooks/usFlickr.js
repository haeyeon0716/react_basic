import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchFlickr = async (opt) => {

    //쿼리키가 내부적으로 querykey라는 property명으로 담겨있기 때문에 비구조화 할당으로 받은 다음에 
    //해당 배열값의 두번째 옵션값을 옵션으로 전달
    const opt = querykey[1];
	let url = '';
	const api_key = '2a1a0aebb34012a99c23e13b49175343';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 100;

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
	}
	if (opt.type === 'user') {
		url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
	}
	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
	}
	const {data} = await axios.get(url);
	return data.photos.photo;
};

export const useFlickrQuery = opt =>{
    //옵션이 들어가는 데이터의 경우에는 옵션에따라 반환되는 값은 다른데 쿼리키가 동일 하면 문제가 발생하기 때문에 옵션값 까지 통째로 쿼리키로 묶어 놓으면 옵션에 따른 결과값으로 고유쿼리키가 자동으로 만들어짐
    return useQuery(['flickrData', opt],fetchFlickr,{
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60
    } )
}