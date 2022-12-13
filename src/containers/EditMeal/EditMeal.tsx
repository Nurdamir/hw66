import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import MealForm from "../../components/MealForm/MealForm";
import Spinner from "../../components/Spinner/Spinner";
import {ApiMeal} from "../../types";

const EditMeal = () => {
  const {id} = useParams();
  const [meal, setMeal] = useState<ApiMeal | null>(null);
  const [oneMealLoading, setOneMealLoading] = useState(false)
  const [updating, setUpdating] = useState(false);

  const fetchOneMeal = useCallback(async () => {
    try {
      setOneMealLoading(true);
      const mealResponse = await axiosApi.get<ApiMeal>('/meals/' + id + '.json');
      setMeal(mealResponse.data);
    } catch (e) {
      console.error(e)
    } finally {
      setOneMealLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchOneMeal();
  }, [fetchOneMeal]);

  const updateDish = async (meal: ApiMeal) => {
    try {
      setUpdating(true);
      await axiosApi.put('/meals/' + id + '.json', meal);
    } catch (e) {
      console.error(e)
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="row mt-2 d-flex justify-content-center">
      <div className="d-flex justify-content-center w-75">
        {oneMealLoading ? <Spinner/> : meal && (
          <MealForm
            onSubmit={updateDish}
            existingMeal={meal}
            isLoading={updating}
          />
        )}
      </div>
    </div>
  );
};

export default EditMeal;