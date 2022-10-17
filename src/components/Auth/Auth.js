import React from "react";
import { Avatar, Container,Paper,Grid, Typography, Button, } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined" 
import useStyles from "./styles.js"
import Input from "./Input"
import { useState } from "react";
import {GoogleLogin} from "react-google-login"
import Icon from "./icon.js";
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom";
import {signin,signup} from "../../actions/auth"

const initialState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const Auth = () => {
    const classes= useStyles();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignup,setIsSignup] = useState(false)
    const [formData,setFormData] = useState(initialState)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            //注册
            dispatch(signup(formData,history))
        }else{
            //登录
            dispatch(signin(formData,history))
        }
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleShowPassword = () => setShowPassword((preShowPassword)=>!preShowPassword)
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            console.log("登录")
            dispatch({type:'AUTH',data:{result,token}})
            // 登录成功后 重定向到首页
            history.push("/")
        }catch(error){
            console.log(error)
        }
        console.log(res)
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup)=>!prevIsSignup);
        setShowPassword(false)
    }
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try Again Later')
    }
    return <>
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? '注册' : '登录'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                   
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/> 
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                        
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? '注册' : '登录'}
                    </Button>
                    <GoogleLogin
                        clientId="GOOGLE ID"
                        render = {(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon/>}
                                variant="contained"

                            >
                                    使用谷歌登录
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                    <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? '您已经有账号了吗? 登录' : "还没有账号吗? 注册" }
                    </Button>
                    </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    </>
}

export default Auth;



