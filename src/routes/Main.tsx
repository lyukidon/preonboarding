import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => {
  //   const name = event.target?.name
  //   navigate()
  // }

  return (
    <div>
      <button name='sign_in' onClick={() => navigate("/sign_in")}>로그인</button>
      <button name='sign_up' onClick={() => navigate("/sign_up")}>회원가입</button>
      {/* 로그인 && <button name='로그아웃'></button> */}
      {/* 로그인  && <button name='마이페이지'></button> */}
    </div>
  );
}

export default Main;