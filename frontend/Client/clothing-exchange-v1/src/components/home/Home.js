import React, { useState } from 'react'
import CarouselFeature from "../carouselfeature/CarouselFeature";
import Info from '../info/Info';
import Login from "../Login";
import Register from "../Register";


const Home = ({clothingitems}) => {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    return (
        <div className = "Home">
            <Info />
            
            <CarouselFeature clothingitems = { clothingitems }/>
            
            {
                currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
            }
        </div>
    )
}

export default Home;