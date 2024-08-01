import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/store';

function Main() {
  const navigate = useNavigate();
  const { accessToken, user, setToken, setUser } = useUserStore();

  const handleSignOut = () => {
    setToken("");
    setUser({})
  }

  return (
    <div>
      {!accessToken &&
        (<div>
          <button name='sign_in' onClick={() => navigate("/sign_in")}>로그인</button>
          <button name='sign_up' onClick={() => navigate("/sign_up")}>회원가입</button>
        </div>)
      }

      {accessToken && 
        (<div>
            <div>{user.nickname}님 환영합니다.</div>
            <button name='로그아웃' onClick={handleSignOut}>로그아웃</button>
            <button name='마이페이지' onClick={() => navigate("/my_page")}>마이페이지</button>
        </div>)
      }
    </div>
  );
}

export default Main;