import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Content from './Content';
import { MyContext } from './MyContext';
import uuid from 'react-uuid';
function App() {
    const [dishes, setDishes] = useState([]);
    const [meal, setMeal] = useState('');
    const [restaurant, setRestaurant] = useState([]);
    const [people, setPeople] = useState([1]);
    const [order, setOrder] = useState({
        ppl: people,
        meal: meal,
        restaurant: restaurant,
        dishes: [
            {
                name: '',
                no: 1,
                id: uuid(),
            },
        ],
    });
    const [availableDishes, setAvailableDishes] = useState([]);
    //get data
    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch('https://fabbi-test.herokuapp.com/dishes');
                const data = await res.json();
                setDishes(data);
            } catch (err) {
                console.warn(err);
            }
        }
        getData();
    }, []);

    return (
        <MyContext.Provider
            value={{
                dishes: dishes,
                setDishes: setDishes,
                restaurant: restaurant,
                setRestaurant: setRestaurant,
                meal: meal,
                setMeal: setMeal,
                people: people,
                setPeople: setPeople,
                order: order,
                setOrder: setOrder,
                availableDishes: availableDishes,
                setAvailableDishes: setAvailableDishes,
            }}>
            <div className='App'>{dishes.length ? <Content /> : <h1>loading</h1>}</div>;
        </MyContext.Provider>
    );
}

export default App;
