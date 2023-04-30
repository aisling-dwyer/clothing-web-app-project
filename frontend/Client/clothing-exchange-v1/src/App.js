import './App.css';
import api from './api/axiosConfig';
import React, {useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import YourAccount from './components/yourAccount/YourAccount.js';
import YourNeighbourhoodWardrobe from './components/yourNeighbourhoodWardrobe/YourNeighbourhoodWardrobe'
import Basket from './components/basket/Basket';
import NewOrder from './components/newOrder/NewOrder';
import CompletedOrder from './components/completedOrder/CompletedOrder';
import Login from './components/Login';
import Logout from './components/logout/Logout';
import Register from './components/Register';
import { AuthContext } from './context/AuthContext';
import { prefix } from '@fortawesome/free-solid-svg-icons';
import resolveProps from '@mui/utils/resolveProps';


const API_REST_URL = "http://localhost:8090"


function App() {

  const[token, setToken] = useState(null);
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  //get all clothing items to display on carousel
  const[clothingitems, setClothingItems] = useState();
  const getClothingItems = async () => {
    try {
      const response = await api.get(API_REST_URL + "/clothingitems/all");
      setClothingItems(response.data);
    } catch(err) {
        console.log(err);
    }
  }

   //post new clothing item to user account
    const [newClothingItem, setNewClothingItem] = useState([]);
    const addClothingItem = async(type, size, colour, available, image) => {
      try {
        const userIdStr = localStorage.getItem('userId');
        const response = await api.post(`${API_REST_URL}/clothingitems/${userIdStr}/addclothingitem`, {
           type: type,
           size: size,
           colour: colour,
           available: available,
           image: image
        },
        {
           headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true"
           }
        });
        setNewClothingItem((newClothingItem) => [response.data, ...newClothingItem]);
      } catch(err) {
        console.log(err);
      }
    };


  //get clothing items associated with a particular users account
  const[yourClothingItems, setYourClothingItems] = useState([]);
  const getYourClothingItems = async () => {
    try {
    
      const userIdStr = localStorage.getItem('userId');
      const response = await api.get(`${API_REST_URL}/clothingitems/${userIdStr}/clothing-items`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true"
        }

      });
      // console.log(token);
      console.log(response.data);
      setYourClothingItems(response.data);
    } catch(err) {
      console.log(err);

    }
  }
  // const editItem = async () => {
  //   try {
  //     const itemIdString = "6405d2fe93c4e1afcba93606";
  //     const response = await api.patch(`${API_REST_URL}/clothingitems/edit-item/${itemIdString}`, {
  //       headers: {
  //         "Authorization" : `Bearer ${localStorage.getItem('token')}`,
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "http://localhost:3000",
  //         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
  //         "Access-Control-Allow-Headers": "*",
  //         "Access-Control-Allow-Credentials": "true"
  //       }
  //     });
  //     // console.log(token);
  //     console.log(response.data);

  //   } catch(err) {
  //   console.log(err);

  //   }
  // }
  

  //get user details associated with a particular users account

  const [userDetails, setUserDetails] = useState();
  const getUserDetails = async () => {
    try {
    
      const userIdStr = localStorage.getItem('userId');
      const response = await api.get(`${API_REST_URL}/users/${userIdStr}/user-details`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      });
      console.log(response.data);
      setUserDetails(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  //get order details associated with a particular users account

  const [orderDetails, setOrderDetails] = useState();
  const getOrderDetails = async () => {
    try {
      const userIdStr = localStorage.getItem('userId');
      const response = await api.get(`${API_REST_URL}/orders/${userIdStr}/order-details`, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true"
        }
      });
      // console.log(token);
      console.log(response.data);
      setOrderDetails(response.data);
    } catch(err) {
      console.log(err);
    }
  }


  useEffect(() => {
   
    const storedToken = localStorage.getItem('token');
   
    if(storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      
      
    }
    getUserDetails();
    getYourClothingItems();
    getClothingItems();
    getOrderDetails();
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };


  return (
    <div className="App">
      <AuthContext.Provider value = {{ token, updateToken, clearToken }}>
        <Header isLoggedIn={isLoggedIn} clearToken={clearToken} />

        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home clothingitems = {clothingitems} />} ></Route>
              <Route path="/yourAccount/YourAccount" element={<YourAccount yourClothingItems = {yourClothingItems} userDetails = {userDetails} orderDetails = {orderDetails} addClothingItem={addClothingItem}/>} ></Route>
              <Route path="/yourNeighbourhoodWardrobe/yourNeighbourhoodWardrobe" element={<YourNeighbourhoodWardrobe clothingItems = {clothingitems} />} ></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/basket/Basket" element={<Basket />}></Route>
              <Route path="/newOrder" element={<NewOrder userDetails={userDetails} />}></Route>
              <Route path="/completedOrder" element={<CompletedOrder userDetails={userDetails} />}></Route>
            </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}


export default App;
