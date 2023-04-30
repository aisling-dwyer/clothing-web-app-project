import React, { useState } from "react";
import axios from '../api/axiosConfig';
import Login from "./Login";

const REGISTER_URL = 'http://localhost:8090/users/add'; 

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [formType, setFormType] = useState('register');
    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [success, setSuccess] = useState(false); 
    const [user, setUser] = useState([]);

    const handleLoginClick = () => {
        setFormType('login');
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleSubmit = (e) => {
        let isValid = true;
        e.preventDefault();
        isValid = validateForm();

        if(isValid) {
          
            add(userName, password, lastName, firstName, email, address, phone);
        }  
    };

    const add = async(userName, password, lastName, firstName, email, address, phone) => {
        try {
            let response = await axios.post(
                REGISTER_URL, 
                {
                    userName: userName,
                    password: password,
                    lastName: lastName,
                    firstName: firstName,       
                    email: email,
                    address: address,
                    phone: phone
                }, 
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Credentials": "true"
                    }
                });
   
            setUser((user) => [response.data, ...user]);
            setSuccess(true); 
       
        } catch(error) {
            console.log(error);
            alert("User could not be registered, please try again.")
        }
     
    };

    const validateForm = () => {
        let isValid = true;

        if(!/^[a-zA-Z0-9]{5,}$/.test(userName)) {
            setUserNameError("Username must contain at least 5 characters, including letters and numbers.");
            isValid = false;

        } else {
            setUserNameError("")
        }
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!strongPasswordPattern.test(password)) {
            setPasswordError("Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one special character of the following @$!%*?&");
            isValid = false;
          
        } else {
            setPasswordError("")
        }

        if(/\d/.test(firstName)) {
            setFirstNameError("First name should not contain numbers.");
            isValid = false;
       
        } else {
            setFirstNameError("")
        }


        if(/\d/.test(lastName)) {
            setLastNameError("Last name should not contain numbers.");
            isValid = false;
        
        } else {
            setLastNameError("")
        }


        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
 
        } else {
            setEmailError("")
        }


        if(!/^[0-9]+$/.test(phone)) {
            setPhoneError("Please enter a valid phone number.");
            isValid = false;
      
        } else {
            setPhoneError("")
        }

        return isValid;
    }

    if (formType === 'register') { 
        return(
            <div className="auth-form-container">
                 {success ? (
                <div>
                    <h1>Your Account has been created</h1>
                    <p>Please <a className = "reroute" href="/login">log in</a> to access your account.</p>
                    <br />
                </div>
            ) : (
                <div>
                    <h3 className="login-title">Register Your New Account</h3>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <label htmlFor="userName">Username: </label>
                        <input value={userName} onChange={handleUserNameChange} type="text" id="userName" name="userName" className={userNameError ? "error" : " "} required/>
                        {userNameError && <span className = "error-message">{userNameError}</span>}

                        <label htmlFor="password">Password: </label>
                        <input value={password} onChange={handlePasswordChange} type="password" id="password" name="password" className={passwordError ? "error" : " "} required/>
                        {passwordError && <span className = "error-message">{passwordError}</span>}

                        <label htmlFor="fname">First Name: </label>
                        <input value={firstName} onChange={handleFirstNameChange} type="text" id="firstName" name="firstName" className={firstNameError ? "error" : " "} required/>
                        {firstNameError && <span className = "error-message">{firstNameError}</span>}

                        <label htmlFor="lastName">Last Name: </label>
                        <input value={lastName} onChange={handleLastNameChange} type="text" id="lastName" name="lastName" className={lastNameError ? "error" : " "} required/>
                        {lastNameError && <span className = "error-message">{lastNameError}</span>}

                        <label htmlFor="email">Email: </label>
                        <input value={email} onChange={handleEmailChange} type="email" id="email" name="email" className={emailError ? "error" : " "} required/>
                        {emailError && <span className = "error-message">{emailError}</span>}

                        <label htmlFor="address">Address: </label>
                        <input value={address} onChange={handleAddressChange} type="text" id="address" name="address" required/>

                        <label htmlFor="phone">Phone: </label>
                        <input value={phone} onChange={handlePhoneChange} type="phone" id="phone" name="phone" className={phoneError ? "error" : " "} required/>
                        {phoneError && <span className = "error-message">{phoneError}</span>}

                        <button className="submit-btn" type="submit" onClick={handleSubmit}>Create Account</button>

                        <button className="link-btn" onClick={handleLoginClick}>Already have an account? Login here.</button>
                    </form>   
                </div>
            )}
            </div> 
        )
    } else { 
        return <Login />
    }
}

export default Register;
