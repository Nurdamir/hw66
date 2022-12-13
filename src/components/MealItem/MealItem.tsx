import React from 'react';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {Meal} from "../../types";

interface Props {
  meal: Meal;
  onDelete: React.MouseEventHandler;
  onChange: React.MouseEventHandler;
  loading: boolean;
}

const MealItem: React.FC<Props> = ({meal, onDelete, onChange, loading}) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h3>{meal.schedule}</h3>
        <p>{meal.description}</p>
        <span>{meal.calories}</span>
        <div>
          <button
            className="btn btn-danger me-2"
            disabled={loading}
            onClick={onDelete}
          >
            {loading ? <ButtonSpinner/> : 'Delete'}
          </button>
          <button
            className="btn btn-warning"
            disabled={loading}
            onClick={onChange}
          >Edit</button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;