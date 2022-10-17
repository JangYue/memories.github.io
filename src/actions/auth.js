import * as api from "../api/index.js"
import {AUTH} from "../constants/actionTypes"

export const signin = (formData,history) => async(dispatch) => {
    try{
        // 用户登录 log in the user
        const {data} = await api.signIn(formData);
        if(data?.token && data.token){
            alert("登录成功!")
        }
        dispatch({type:AUTH,data})
        history.push("/")
    }catch(error){
        alert(`登录失败![${error?.response?.data?.message}]`)
        console.log(error)
    }
}
export const signup = (formData,history) => async(dispatch) => {
    try{
        // 用户注册 the user
        const {data} = await api.signUp(formData)
        if(data?.token && data.token){
            alert("注册成功!")
        }
        dispatch({type:AUTH,data})
        history.push("/")
    }catch(error){
        alert(`${error.message}`)
        console.log(error)
    }
}