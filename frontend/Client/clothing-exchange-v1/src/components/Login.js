import React, { useRef, useState, useContext  } from "react";
import axios from '../api/axiosConfig';
import { AuthContext } from "../context/AuthContext";

const LOGIN_URL = 'http://localhost:8090/token'; 

export const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false); 
    const userRef = useRef();
    const authContext = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = btoa(`${userName}:${pass}`);
            const response = await axios.post(LOGIN_URL, {},{
               headers:{ 'Authorization': `Basic ${token}`
            },
            });
            if(response.status === 200) {
                authContext.updateToken(token);
                setSuccess(true);
                console.log(token);
            }
        } catch(error) {
            setErrMsg("Invalid username or password, please try again");
        }
        
        setUserName('');
        setPass('');
        userRef.current.focus();
        
    }

    return(
        <div className="auth-form-container">
            {success ? (
                <div>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a className = "reroute" href="./YourAccount/yourAccount">Go To Your Account</a>
                    </p>
                </div>
            ) : (
                <div>
                    {errMsg && (<p className="error">{errMsg}</p>
                    )}
                    <h3>Login to your Account</h3>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="userName">Username: </label>
                        <input value={userName} ref={userRef} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Your Username" id="userName" name="userName" required/>
                        <label htmlFor="password">Password: </label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                        <button className = "submit-btn" type="submit">Login</button>
                    </form>
                    <button className = "link-btn" onClick = {() => props.onFormSwitch('register')}>Don't have an account? Register here</button>
                </div>
            )}
            
        </div>
    )
}

export default Login;