import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";
import MealForm from "../../components/MealForm/MealForm";
import {ApiMeal} from "../../types";

const NewMeal = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false)

  const createMeal = async (meal: ApiMeal) => {
    try {
      setCreating(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
    } catch (e) {
      console.error(e)
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="row mt-2 d-flex justify-content-center">
      <div className="d-flex justify-content-center w-75">
        <MealForm onSubmit={createMeal} isLoading={creating}/>
      </div>
    </div>
  );
};

export default NewMeal;