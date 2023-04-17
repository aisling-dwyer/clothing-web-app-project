import React, { useState } from "react";
import axios from '../api/axiosConfig';

const REGISTER_URL = 'http://localhost:8090/users/add'; 


export const Register = (props) => {


    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUsername] = useState('');
    const [lname, setLastName] = useState('');
    const [fname, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');



    //Post with Axios
    const add = async(username, pass, lname, fname, email, address, phone) => {
        let response = await axios.post(REGISTER_URL, {
            username: username,
            pass: pass,
            fname: fname,
            lname: lname,
            email: email,
            address: address,
            phone: phone
        });
        setUser((user) => [response.data, ...user]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        add(username, pass, fname, lname, email, address, phone);
    }

    return(
        <div className="auth-form-container">
            <h3>Register Your New Account</h3>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username"/>

                <label htmlFor="password">Password: </label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password"/>

                <label htmlFor="fname">First Name: </label>
                <input value={fname} onChange={(e) => setFirstName(e.target.value)} type="text" id="fname" name="fname"/>

                <label htmlFor="lname">Last Name: </label>
                <input value={lname} onChange={(e) => setLastName(e.target.value)} type="text" id="lname" name="lname"/>

                <label htmlFor="email">Email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"/>

                <label htmlFor="address">Address: </label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" id="address" name="address"/>

                <label htmlFor="phone">Phone: </label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" id="phone" name="phone"/>
                <button className = "submit-btn" type="submit">Create Account</button>

                <button className = "link-btn" onClick = {() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            </form>   
        </div> 
    )
}

export default Register;