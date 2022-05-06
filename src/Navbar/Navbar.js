import React,{useState,useEffect} from "react";
import {AppBar,Avatar,Button,Toolbar,Typography} from "@material-ui/core"
import memories from "../images/memories.png"
import useStyles from "./styles.js"
import {Link,useHistory,useLocation} from "react-router-dom"
import { useDispatch } from "react-redux";
import { LOGOUT } from "../constants/actionTypes";
import decode from "jwt-decode"
import { useCallback } from "react";

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation();
    // 注销
    const logout = useCallback( () => {
        dispatch({type:LOGOUT});
        setUser(null);
        history.push('/');
    },[dispatch,history])
    useEffect(()=>{
        const token =user?.token;
        // 檢查是否有token
        if(token){
            const decodeToken = decode(token)
            // 半段令牌是不是过期
            if(decodeToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location,logout,user?.token])
    return <>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height={60}/>
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user?(
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>    
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    )
                    :(
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    </>
  
}
export default Navbar;