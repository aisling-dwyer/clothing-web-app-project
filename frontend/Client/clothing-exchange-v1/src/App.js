
import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';


function App() {

  const[users, setUsers] = useState();

  const getUsers = async () => {

    try {
      const response = await api.get("/users/allusers");
      console.log(response.data);
      setUsers(response.data);
    } catch(err) {
        console.log(err);
    }

  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
