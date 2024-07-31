import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpRequest } from '../utils/query';
import { signUpSchema } from '../utils/yupSchema';
import { useNavigate } from 'react-router-dom';

const StyledSignUpForm = styled.form`
  width: 400px;
  margin: 40px auto;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
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

function SignUp() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data:any) => {
    try {
      const signUpResult = await signUpRequest({
        id: data.id, 
        password: data.password,
        nickname: data.nickname
      })
      if (signUpResult!.success) {
        alert('회원가입이 완료되었습니다.');
        navigate("/sign_in");
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <StyledSignUpForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        아이디:
        <Input
          type="text"
          {...register('id')}
          placeholder="아이디"
        />
        {errors.id && <ErrorMsg>{errors.id.message}</ErrorMsg>}
      </div>
      <div>
        비밀번호:
        <Input
          type="password"
          {...register('password')}
          placeholder="비밀번호"
        />
        {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}

      </div>
      <div>
        비밀번호 확인:
        <Input
          type="password"
          {...register('confirmPassword')}
          placeholder="비밀번호 확인"
        />
        {errors.confirmPassword && <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>}
      </div>
      <div>
        닉네임:
        <Input
          type="text"
          {...register("nickname")}
          placeholder='닉네임'
        />
        {errors.nickname && <ErrorMsg>{errors.nickname.message}</ErrorMsg>}
      </div>
      <Button type="submit">회원가입</Button>
    </StyledSignUpForm>
  );
}

export default SignUp;
