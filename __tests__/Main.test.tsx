import { render, screen } from "@testing-library/react";
import Main from '../src/routes/Main';
import React from "react";
// import { create } from "zustand"
// import { persist } from "zustand/middleware";

jest.mock('../src/store/store', () => ({
  useUserStore: () => ({
    accessToken: true,
    user: {nickname: "ryu"},
    setToken: jest.fn(),
    setUser: jest.fn()
  })
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe("메인 페이지", () => {
  it("로그인 시, id 확인", async () =>{

    jest.mock('../src/store/store', () => ({
      useUserStore: () => ({
        accessToken: true,
        user: {nickname: "ryu"},
        setToken: jest.fn(),
        setUser: jest.fn()
      })
    }));
    
    render(<Main />);
    const idCode = await screen.findByText(/ryu님 환영합니다./)
    expect(idCode.textContent).toBe('ryu님 환영합니다.');
  })

  // it("로그인 시, button 확인", () => {
  //   render(<Main />);

  //   const signInButton = screen.getByRole('button', {name: "로그인"});
  //   const signUpButton = screen.getByRole('button', {name: "회원가입"});
    
  //   const signOutButton = screen.getByRole('button', {name: "로그아웃"});
  //   const myPageButton = screen.getByRole('button', {name: "마이페이지"});

  //   expect(signInButton).toBeInTheDocument();
  //   expect(signUpButton).toBeVisible();
  // })
})

// describe("로그인 페이지", () => {

// })
