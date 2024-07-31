import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInRequest } from '../utils/query';
import { signInSchema } from '../utils/yupSchema';
import { useUserStore } from '../store/store'
import { useNavigate } from 'react-router-dom';

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

function SignIn() {
  const {setToken, setUser} = useUserStore()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    try {
      const signIn = await signInRequest(data);
      if (!signIn){
        throw new Error("로그인 에러");
      }

      const {accessToken, avatar, nickname, userId, success} = signIn
      if (success){
        setToken(accessToken)
        setUser({
          avatar, nickname, userId,
        })
        navigate("/")
      }
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
