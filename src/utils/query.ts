import axios from 'axios'

interface SignInData {
  "id": string,
  "password": string
}

interface SignUpData extends SignInData {
  "nickname": string,
}

interface AccessToken {
  "Authorization": string
}

interface UserData{
  "avatar"?: string
  "nickname"?: string
}


export const signUpRequest = async (data:SignUpData) => {
  try{
    await axios({
      method: "post",
      baseURL: import.meta.env.VITE_BASEURL as string,
      url: "/register",
      data
    })
  }catch(error){
    console.log(error)
  }
}

export const signInRequest = async (data: SignInData) => {
  try{
    const result = await axios({
      method: "post",
      baseURL: import.meta.env.VITE_BASEURL as string,
      url: `/login?expiresIn=${import.meta.env.VITE_ACCESS_EXPIRE}`,
      data
    })
    return result;
  }catch(error){
    console.log(error)
  }
}

export const userDataRequest = async (data:AccessToken) => {
  try{
    return (await axios({
      method: "get",
      baseURL: process.env.VITE_BASEURL as string,
      url: "/user",
      data
    }))
    return data
  }catch(error){
    console.error(error);
  }
}

export const changUserDataRequest = async (data: UserData) => {
  try{
    await axios({
      method: "patch",
      baseURL: process.env.VITE_BASEURL as string,
      url: "/profile",
      data
    })
  }catch(error){
    console.error(error)
  }
}
