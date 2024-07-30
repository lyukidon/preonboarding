import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInRequest } from '../utils/query';

const StyledSignInForm = styled.form`
  width: 400px;
  margin: 40px auto;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;

  :focus {
    outline-color: #3498db;
  }
`;

const ErrorMsg = styled.p`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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

// Validation Schema
const schema = Yup.object().shape({
  id: Yup.string()
    .min(3, "3자리 이상 작성해주세요.")
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(6, '비밀번호는 최소 6자리 이상이어야합니다.')
    .required('비밀번호를 입력해주세요.'),
});

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    try {
      const signIn = await signInRequest(data);
      console.log(signIn);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledSignInForm onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Label>아이디:</Label>
        <Input type="text" placeholder="아이디" {...register('id')} />
        {errors.id && <ErrorMsg>{errors.id.message}</ErrorMsg>}
      </InputContainer>

      <InputContainer>
        <Label>비밀번호:</Label>
        <Input type="password" placeholder="비밀번호" {...register('password')} />
        {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
      </InputContainer>

      <ButtonContainer>
        <Button type="submit">로그인</Button>
      </ButtonContainer>
    </StyledSignInForm>
  );
}

export default SignIn;
