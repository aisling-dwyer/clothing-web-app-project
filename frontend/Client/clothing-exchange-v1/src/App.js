import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';

const API_REST_URL = "http://localhost:8090"


function App() {

  // const[users, setUsers] = useState();

  // const getUsers = async () => {

  //   try {
  //     const response = await api.get(API_REST_URL + "/users/allusers");

  //     setUsers(response.data);
  //   } catch(err) {
  //       console.log(err);
  //   }

  // }

  // useEffect(() => {
  //   getUsers();
  // }, [])

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

  // const getUserData = async (id) => {
  //   try
  //   {
  //     const response = await api.get(`/users/getUser/${id}`);

  //     const singleUser = response.data;


  //     setClothingItemToBeAdded(singleClothingItem);
  //   }
  //   catch(error) {

  //   }
  // }

  useEffect(() => {
    getClothingItems();
  }, [])

  return (
    <div className="App">
      <Header></Header>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home clothingitems = {clothingitems} />} ></Route>

          </Route>
      </Routes>
    </div>
  );
}

export default App;
