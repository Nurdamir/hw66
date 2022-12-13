import React, {useState} from 'react';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {ApiMeal} from "../../types";

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingMeal?: ApiMeal;
  isLoading?: boolean;
}

const initialState: ApiMeal = {
  schedule: '',
  description: '',
  calories: '',
};

const MealForm: React.FC<Props> = ({
  onSubmit,
  existingMeal= initialState,
  isLoading= false
 }) => {
  const [meal, setMeal] = useState<ApiMeal>(existingMeal);

  const onMealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setMeal(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...meal,
    });
    setMeal({calories: '', description: '', schedule: '',});
  };

  return (
    <form onSubmit={onFormSubmit} className="w-75">
      <div className="form-group">
        <label
          htmlFor="schedule"
          className="fw-bold fs-4"
        >Time having meal!</label>
        <select
          required
          name="schedule"
          className="form-control mb-2"
          value={meal.schedule}
          onChange={onMealChange}
        >
          <option value="" disabled>Please, select...</option>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <label
          htmlFor="description"
          className="fw-bold fs-4"
        >Description</label>
        <textarea
          required
          id="description" name="description"
          className="form-control mb-2"
          value={meal.description}
          onChange={onMealChange}
        />

        <label
          htmlFor="calories"
          className="fw-bold fs-4"
        >Calories</label>
        <input
          required
          type="number"
          name="calories"
          className="form-control mb-2"
          value={meal.calories}
          onChange={onMealChange}
        />
      </div>
      <button type="submit" disabled={isLoading} className="btn btn-primary mt-2 fs-5">
        {isLoading && <ButtonSpinner/>}
        Save
      </button>
    </form>
  );
};

export default MealForm;