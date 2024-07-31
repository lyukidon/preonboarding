import axios, { Axios, AxiosResponse } from "axios";

interface SignInData {
  id: string;
  password: string;
}

interface SignUpData extends SignInData {
  nickname: string;
}

type AccessToken = string;

interface UserData {
  avatar?: string;
  nickname?: string;
}

interface SignUpResult {
  message: string;
  success: boolean;
}

export interface SignInResult {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string | null;
  nickname: string;
}

export interface UserDataResult {
  id: string;
  nickname: string;
  avatar: null;
  success: boolean;
}

export interface ChangeDataResult {
  avatar: string;
  nickname: string;
  message: string;
  success: boolean;
}

export const signUpRequest = async (data: SignUpData): Promise<SignUpResult | undefined> => {
  return (
    await axios({
      method: "post",
      baseURL: import.meta.env.VITE_BASEURL as string,
      url: "/register",
      data,
    })
  ).data;
};

export const signInRequest = async (data: SignInData): Promise<SignInResult | undefined> => {
  const response: AxiosResponse = await axios({
    method: "post",
    baseURL: import.meta.env.VITE_BASEURL as string,
    url: `/login?expiresIn=${import.meta.env.VITE_ACCESS_EXPIRE}`,
    data,
  });
  return response.data;
};

export const getUserData = async (accessToken: AccessToken): Promise<UserDataResult | undefined> => {
  const response: AxiosResponse = await axios({
    method: "get",
    baseURL: import.meta.env.VITE_BASEURL as string,
    url: "/user",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  });
  return response.data;
};

export const changUserDataRequest = async (
  data: UserData,
  accessToken: string
): Promise<ChangeDataResult | undefined> => {
  const filteredData = Object.keys(data)
    .filter((c) => data[c as keyof UserData] !== "")
    .reduce((a, c) => ({ ...a, [c]: data[c as keyof UserData] }), {});
  const response: AxiosResponse = await axios({
    method: "patch",
    baseURL: import.meta.env.VITE_BASEURL as string,
    url: "/profile",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: filteredData,
  });
  return response.data;
};
