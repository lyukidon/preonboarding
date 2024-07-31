import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeUserDataSchema } from '../utils/yupSchema';
import { ChangeDataResult, changUserDataRequest, getUserData, UserDataResult } from '../utils/query';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/store';
import axios from 'axios';

const StyledForm = styled.form`
  width: 400px;
  margin: 40px auto;
  text-align: center;
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

function MyPage() {
  const navigate = useNavigate()
  const {accessToken, setUser} = useUserStore()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ChangeUserDataSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data:any) => {
    try {
      const changeUserData = await changUserDataRequest(data, accessToken);
      if (!changeUserData){
        throw new Error("사용자 데이터 변경 에러")
      }

      const {success} = changeUserData
      if (success){
        const newUserData = await getUserData(accessToken);
        const { id, nickname, avatar } = newUserData || {};
        setUser({ id, nickname, avatar })
        navigate("/")
      }
    } catch (error) {
      if (axios.isAxiosError(error)){
        if (error.response?.data.message === '토큰이 만료되었습니다. 다시 로그인 해주세요.'){
          alert(error.response?.data.message)
          navigate('/sign_in')
          return;
        }
        alert(error.response?.data.message)
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        avatar:
        <Input
          type="text"
          {...register('avatar')}
          placeholder="avatar"
        />
        {errors.avatar && <p style={{ color: 'red' }}>{errors.avatar.message}</p>}
      </div>
      <div>
        nickname:
        <Input
          type="text"
          {...register('nickname')}
          placeholder="nickname"
        />
        {errors.nickname && <p style={{ color: 'red' }}>{errors.nickname.message}</p>}
      </div>
      <Button type="submit">Save</Button>
    </StyledForm>
  );
}

export default MyPage;
