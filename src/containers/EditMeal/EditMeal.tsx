import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ApiMeal} from "../../types";
import axiosApi from "../../axiosApi";
import MealForm from "../../components/MealForm/MealForm";

const EditMeal = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<ApiMeal | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchOneMeal = useCallback(async () => {
    const mealResponse = await axiosApi.get<ApiMeal>('/meals/' + id + '.json');
    setMeal(mealResponse.data);
  }, [id]);

  useEffect(() => {
    void fetchOneMeal();
  }, [fetchOneMeal]);

  const updateDish = async (meal: ApiMeal) => {
    try {
      setUpdating(true);
      await axiosApi.put('/meals/' + id + '.json', meal);
      navigate('/');
    } finally {
      setUpdating(false);
    }

  };

  // const existingMeal = meal && {
  //   ...meal,
  // };

  return (
    <div className="row mt-2">
      <div className="col">
        {meal && (
          <MealForm
            onSubmit={updateDish}
            existingMeal={meal}
            isEdit
            isLoading={updating}
          />
        )}
      </div>
    </div>
  );
};

export default EditMeal;