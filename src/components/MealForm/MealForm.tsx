import React, {useState} from 'react';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {ApiMeal} from "../../types";

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  existingMeal?: ApiMeal;
  isEdit?: boolean;
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
 isEdit = false,
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
    })
    setMeal({calories: '', description: '', schedule: '',});
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <select
          required
          name="schedule"
          className="form-control"
          value={meal.schedule}
          onChange={onMealChange}
        >
          <option value="" disabled>Please, select...</option>
          <option value="breakfast">Breakfast</option>
          <option value="snack">Snack</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          required
          id="description" name="description"
          className="form-control"
          value={meal.description}
          onChange={onMealChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">Calories</label>
        <input
          required
          type="number"
          name="calories"
          className="form-control"
          value={meal.calories}
          onChange={onMealChange}
        />
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary mt-2">
        {isLoading && <ButtonSpinner/>}
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default MealForm;