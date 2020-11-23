import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Content from './Content';

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

    return <div className='App'>{dishes.length ? <Content dishes={dishes} /> : <h1>Error</h1>}</div>;
}

export default App;
