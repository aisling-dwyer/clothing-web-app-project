import React, { useRef, useState, useContext, useEffect  } from "react";
import axios from '../api/axiosConfig';
import { AuthContext } from "../context/AuthContext";
import Register from "./Register";


const API_REST_URL = 'http://localhost:8090'; 

export const Login = (props) => {
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuccess] = useState(false); 
    const [form, setForm] = useState('login');
    const [userId, setUserId] = useState('');
    const userRef = useRef();
    const authContext = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = btoa(`${userName}:${pass}`);
            const response = await axios.post(`${API_REST_URL}/token`, {},{
               headers:{ 'Authorization': `Basic ${token}`}, 
            });
            if(response.status === 200) {
                authContext.updateToken(token);
                getUserId(token);
                setSuccess(true);
                localStorage.setItem('token', response.data)       
            }
        } catch(error) {
            alert("Invalid username or password, please try again");
            setSuccess(false);
        }
        setUserName('');
        setPass('');
        userRef.current.focus();
    }
    
    const getUserId = async () => {
        const token = localStorage.getItem('token');
        const response1 = await axios.get(`${API_REST_URL}/users/${userName}`, {
            headers: { Authorization : `Basic ${token}` },
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true"
          });
        setUserId(response1.data.id);
        localStorage.setItem('userId', response1.data.id);
        // console.log(response1.data.id);
        // console.log(localStorage.getItem('userId'));
    }

    useEffect(() => {
        getUserId();
    }, []);

    return(
        <div className="auth-form-container">
            {success ? (
                <div>
                    <h1>You are logged in!</h1>
                    <br />
                    <p className = "page-link">
                        <a className = "reroute" href="./YourAccount/yourAccount">Go To Your Account</a>
                    </p>
                </div>
            ) : (
                <div>
                    {form === 'login' ? (
                        <div>
                            <h3 className = "login-title">Login to your Account</h3>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <label htmlFor="userName">Username: </label>
                                <input value={userName} ref={userRef} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Your Username" id="userName" name="userName" required/>
                                <label htmlFor="password">Password: </label>
                                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                                <button className = "submit-btn" type="submit" >Login</button>
                            </form>
                            <button className="link-btn" onClick={() => setForm('register')}>
                                Don't have an account? Register here
                            </button>
                        </div>
                    ) : (
                        <Register />
                    )}
                    
                </div>
            )}
            
        </div>
    )
}

export default Login;