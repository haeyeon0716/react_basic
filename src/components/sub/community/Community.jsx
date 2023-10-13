import Layout from "../../common/layout/Layout"
import './Community.scss';
import {useRef} from 'react'


export default function Community() {
  const refinput = useRef(null);
  const refTextArea = useRef(null);
  return (
    <Layout title='Community'>
        <div className="inputBox">
          <input ref={refinput} type="text" placeholder="제목을 입력하세요" /><br />
          <textarea ref={refTextArea} cols="30" rows="3" placeholder="본문을 입력하세요."></textarea>

          <nav className="btnSet">
            <button>cancel</button>
            <button>write</button>
          </nav>
        </div>
    </Layout>
  );
}

/*
  Create: 게시글 저장
  Read: 게시글 보기
  Update: 게시글 수정
  Delete: 게시글 삭제

  localStorage: 모든 부라우저가 가지고 있는 경량의 저장소 (문자열: 5MB)
*/
 