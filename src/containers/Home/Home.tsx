import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";
import MealItem from "../../components/MealItem/MealItem";
import Spinner from "../../components/Spinner/Spinner";
import {ApiMealsList, Meal} from "../../types";


const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [removeMealItemId, setRemoveMealItemId] = useState<string>('');

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
    setRemoveMealItemId(id);
    try {
      await axiosApi.delete('/meals/' + id + '.json');
      await fetchMeals();
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeMeal = (id: string) => {
    navigate('/edit-meal/' + id);
  };

  const calculateKCal = () => {
    return meals.reduce((acc, oneMeal) => acc + parseFloat(oneMeal.calories), 0);
  };

  return (
    <div className="row mt-2 d-flex justify-content-center">
      <div className="mb-2 d-flex justify-content-center align-items-center fs-3">Total:
        <strong className="mx-2">{calculateKCal()}</strong>
        KCal
        <Link className="btn btn-outline-dark ms-2 fs-4" to={'/new-meal'}>Add new meal</Link>
      </div>
      {loading ? <Spinner/> : (
        <div className="col-7">
          {meals.map(meal => {
            return <MealItem
              key={meal.id}
              meal={meal}
              loading={meal.id === removeMealItemId}
              onChange={() => onChangeMeal(meal.id)}
              onDelete={() => onDeleteMeal(meal.id)}/>
          })}
        </div>
      )}
    </div>
  );
};

export default Home;

