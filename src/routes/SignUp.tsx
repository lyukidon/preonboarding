import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// styled component
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpRequest } from '../utils/query';

const StyledSignUpForm = styled.form`
  width: 400px;
  margin: 40px auto;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;

  :focus {
    outline-color: #3498db;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #2ecc71;
  }
`;

const ErrorMsg = styled.p`
  color: red;
`;

// Validation Schema
const schema = Yup.object().shape({
  id: Yup.string()
    .min(3, "3자리 이상 작성해주세요.")
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(6, '비밀번호는 최소 6자리 이상이어야합니다.').oneOf(
      [Yup.ref('password'), undefined],
      '비밀번호가 일치하지 않습니다.',
    )
    .required('비밀번호를 입력해주세요.'),
  nickname: Yup.string()
    .min(2, "닉네임을 2글자 이상 작성해주세요.")
    .required("닉네임을 입력해주세요."),
  confirmPassword: Yup.string()
    .required('비밀번호 확인을 입력해주세요.'),
});

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data:any) => {
    try {
      const signUp = await signUpRequest({
        id: data.id, 
        password: data.password,
        nickname: data.nickname
      })
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <StyledSignUpForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        {...register('id')}
        placeholder="아이디"
      />
      {errors.id && <ErrorMsg>{errors.id.message}</ErrorMsg>}

      <Input
        type="password"
        {...register('password')}
        placeholder="비밀번호"
      />
      {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}


      <Input
        type="password"
        {...register('confirmPassword')}
        placeholder="비밀번호 확인"
      />
      {errors.confirmPassword && <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>}

      <Input
        type="text"
        {...register("nickname")}
        placeholder='닉네임'
      />
      {errors.nickname && <ErrorMsg>{errors.nickname.message}</ErrorMsg>}

      <Button type="submit">회원가입</Button>
    </StyledSignUpForm>
  );
}

export default SignUp;
