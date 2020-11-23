import React, { useState, useEffect, useContext } from 'react';
import Step1 from './Component/Step1';
import Step2 from './Component/Step2';
import Step3 from './Component/Step3';
import Review from './Component/Review';
import uuid from 'react-uuid';
import { Steps, message, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { MyContext } from './MyContext';
let content = '';
const { Step } = Steps;

const steps = [
    {
        title: 'Step 1',
        content: 'First-content',
    },
    {
        title: 'Step 2',
        content: 'Second-content',
    },
    {
        title: 'Step 3',
        content: 'Last-content',
    },
    {
        title: 'Review',
        content: 'Review',
    },
];
export default function Content() {
    const [current, setCurrent] = useState(0);
    const context = useContext(MyContext);
    const dishes = context.dishes;
    //get meal value
    const [meal, setMeal] = useState('');
    const onMealChange = value => {
        setMeal(value);
        resetRestaurant();
    };
    //get number of ppl
    const [people, setPeople] = useState(1);
    const onPeopleChange = value => {
        setPeople(value);
    };

    //filter restaurant by meal
    const [filterRestaurants, setFilterRestaurant] = useState([]);
    useEffect(() => {
        const _filterRestaurants = dishes.filter(dish => dish.availableMeals.includes(meal.toLowerCase()));
        setFilterRestaurant(_filterRestaurants);
    }, [meal, dishes]);

    //get restaurant name
    const [restaurant, setRestaurant] = useState('');
    const onSelectRestaurant = value => {
        setRestaurant(value);
        resetDishes();
    };

    //get available dishes
    const [availableDishes, setAvailableDishes] = useState([]);
    useEffect(() => {
        const _availableDishes = filterRestaurants.filter(item => item.restaurant === restaurant);
        setAvailableDishes(_availableDishes);
    }, [filterRestaurants, restaurant]);
    //order
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
    //add item to order
    const addItem = () => {
        let _order = { ...order };
        _order.dishes.push({
            name: '',
            no: 1,
            id: uuid(),
        });
        setOrder(_order);
    };
    //remove item from order
    const removeItem = id => {
        let _order = { ...order };
        let index = _order.dishes.findIndex(item => item.id === id);
        console.log(_order.dishes[index].name);
        let _availableDishes = [...availableDishes];
        console.log(_availableDishes);
        _availableDishes.push(_order.dishes[index]);
        console.log(_availableDishes);
        setAvailableDishes(_availableDishes);
        _order.dishes.splice(index, 1);
        setOrder(_order);
    };

    //save dishes info
    //name
    const saveDishName = (value, id) => {
        let _order = { ...order };
        let index = _order.dishes.findIndex(item => item.id === id);
        _order.dishes[index].name = value;
        let rmAvailableDishNameIndex = availableDishes.findIndex(item => item.name === value);
        let _availableDishes = [...availableDishes];
        _availableDishes.splice(rmAvailableDishNameIndex, 1);
        setAvailableDishes(_availableDishes);
        setOrder(_order);
    };
    //number of dishes
    const saveDishNumber = (value, id) => {
        let _order = { ...order };
        let index = _order.dishes.findIndex(item => item.id === id);
        _order.dishes[index].no = value;
        setOrder(_order);
    };

    //disable dot in input number
    const disableDot = e => {
        if (e.keyCode === 190 || e.keyCode === 110) {
            e.preventDefault();
        }
    };

    //reset dish
    const resetDishes = () => {
        let _order = { ...order };
        _order.dishes = [
            {
                name: '',
                no: 1,
                id: uuid(),
            },
        ];
        setOrder(_order);
    };
    //reset restaurant
    const resetRestaurant = () => {
        setRestaurant('');
        let _order = { ...order, restaurant: '' };
        setOrder(_order);
        resetDishes();
    };

    const next = () => {
        let _order = { ...order, ppl: people, meal: meal, restaurant: restaurant };
        setOrder(_order);
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const done = () => {
        console.log('Order: ', order);
        return message.success('Processing complete!');
    };

    if (dishes) {
        switch (current) {
            case 0:
                content = (
                    <Step1
                        meal={meal}
                        onMealChange={onMealChange}
                        onPeopleChange={onPeopleChange}
                        people={people}
                        disableDot={disableDot}
                        next={next}
                    />
                );
                break;
            case 1:
                content = (
                    <Step2
                        meal={meal}
                        restaurant={restaurant}
                        filterRestaurants={filterRestaurants}
                        onSelectRestaurant={onSelectRestaurant}
                        next={next}
                        prev={prev}
                    />
                );
                break;
            case 2:
                content = (
                    <Step3
                        restaurant={restaurant}
                        availableDishes={availableDishes}
                        disableDot={disableDot}
                        addItem={addItem}
                        order={order}
                        removeItem={removeItem}
                        saveDishName={saveDishName}
                        saveDishNumber={saveDishNumber}
                        next={next}
                        prev={prev}
                        people={people}
                    />
                );
                break;
            case 3:
                content = <Review order={order} done={done} prev={prev} />;
                break;
            default:
                content = <Step1 />;
                break;
        }
    } else {
        content = <h1>Error</h1>;
    }

    return (
        <Row justify='center' style={{ marginTop: 100 }}>
            <Col sm={24} md={22} lg={16} xl={14}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className='steps-content'>{content}</div>
            </Col>
        </Row>
    );
}
