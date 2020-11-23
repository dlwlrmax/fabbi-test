import { createContext } from 'react';

export const MyContext = createContext({
    dishes: [],
    setDishes: () => {},
    restaurant: '',
    setRestaurant: () => {},
    meal: '',
    setMeal: () => {},
    people: 1,
    setPeople: () => {},
    availableDishes: [],
    setAvailableDishes: () => {},
    order: {},
    setOrder: () => {},
});
