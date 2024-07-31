import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  id: Yup.string()
    .min(3, "3자리 이상 작성해주세요.")
    .required('이메일을 입력해주세요.'),
  password: Yup.string()
    .min(6, '비밀번호는 최소 6자리 이상이어야합니다.')
    .required('비밀번호를 입력해주세요.'),
});

export const signUpSchema = Yup.object().shape({
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

export const ChangeUserDataSchema = Yup.object().shape({
  avatar: Yup.string(),
  nickname: Yup.string(),
});