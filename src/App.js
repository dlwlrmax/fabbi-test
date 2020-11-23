import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Content from './Content';
import { MyContext } from './MyContext';
function App() {
    const [dishes, setDishes] = useState([]);

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
        <MyContext.Provider value={{ dishes: dishes }}>
            <div className='App'>{dishes.length ? <Content /> : <h1>loading</h1>}</div>;
        </MyContext.Provider>
    );
}

export default App;
