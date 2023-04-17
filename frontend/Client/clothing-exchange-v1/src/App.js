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
import { AuthContext } from './context/AuthContext';


const API_REST_URL = "http://localhost:8090"


function App() {

  const[token, setToken] = useState(null);

  //get all clothing items to display on carousel
  const[clothingitems, setClothingItems] = useState();
  const getClothingItems = async () => {
    try {
      const response = await api.get(API_REST_URL + "/clothingitems/allitems");
      console.log(response.data);
      setClothingItems(response.data);
    } catch(err) {
        console.log(err);
    }
  }

  //get clothing items associated with a particular users account
  const[yourClothingItems, setYourClothingItems] = useState();
  const getYourClothingItems = async () => {
    try {
      const userIdString = "6436bffe6b1b370ff27b9592";
      const response = await api.get(`${API_REST_URL}/clothingitems/${userIdString}/clothing-items`, {
        headers: {
          // headers: { Authorization : `Basic ${token}` }
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

  //get user details associated with a particular users account
  const [userDetails, setUserDetails] = useState();
  const getUserDetails = async () => {
    try {
      const userIdString = "6436bffe6b1b370ff27b9592";
      const response = await api.get(`${API_REST_URL}/${userIdString}`, {
        headers: { Authorization : `Basic ${token}` }
      });
      console.log(token);
      console.log(response.data);
      setUserDetails(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  //add clothing items to basket 
  const [basketItems, setBasketItems] = useState([]);
  const onAdd = (clothingItem) => {
      setBasketItems([...basketItems, { ...clothingItem, qty: 1 }]);
    }
  
  const onRemove = (clothingItem) => {
    const exist = cartItems.find((x) => x.id === clothingItem.id);
    setCartItems(basketItems.filter((x) => x.id !== clothingItem.id));
    
  };

  useEffect(() => {
   
    const storedToken = localStorage.getItem('token');
    if(storedToken) {
      setToken(storedToken);
    }
    getUserDetails();
    getYourClothingItems();
    getClothingItems();
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
        <Header />

        <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home clothingitems = {clothingitems} />} ></Route>
              <Route path="/yourAccount/YourAccount" element={<YourAccount yourClothingItems = {yourClothingItems} userDetails = {userDetails}/>} ></Route>
              <Route path="/yourNeighbourhoodWardrobe/yourNeighbourhoodWardrobe" element={<YourNeighbourhoodWardrobe clothingItems = {clothingitems}/>} ></Route>
              <Route path="/basket/Basket" element={<Basket basketItems={basketItems} onAdd={onAdd} onRemove={onRemove}/>}></Route>
            </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}


export default App;
