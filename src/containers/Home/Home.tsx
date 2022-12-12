import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {ApiMealsList, Meal} from "../../types";
import axiosApi from "../../axiosApi";
import MealItem from "../../components/MealItem/MealItem";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const location = useLocation();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const mealsResponse = await axiosApi.get<ApiMealsList | null>('/meals.json');
      const meals = mealsResponse.data;

      let newMeals: Meal[] = [];

      if (meals) {
        newMeals = Object.keys(meals).map(id => {
          const meal = meals[id];
          return {
            ...meal,
            id
          }
        });
      }

      setMeals(newMeals);
      // updateCart(newDishes);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (location.pathname === '/') {
      void fetchMeals().catch(console.error);
    }
  }, [location, fetchMeals]);


  const onDeleteMeal = async (id: string) => {
  await axiosApi.delete('/meals/' + id + '.json');
  await fetchMeals();
  }

  const onChangeMeal = (id: string) => {

  }

  // {/*to={'/edit-meal/' + meal.id}*/}

  return (
    <div className="row mt-2">
      Home
      <div>Total Price:
        <Link className="btn btn-success" to={'/new-meal'}>Add new meal</Link>

      </div>

      {loading ? <Spinner/> : (
        <div className="col-7">
          {meals.map(meal => {
            return <MealItem key={meal.id} meal={meal} onDelete={() => onDeleteMeal(meal.id)}/>
          })}
        </div>
      )}
    </div>
  );
};

export default Home;

