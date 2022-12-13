import React from 'react';
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {Meal} from "../../types";

interface Props {
  meal: Meal;
  onDelete: React.MouseEventHandler;
  onChange: React.MouseEventHandler;
  loading: boolean;
}

const MealItem: React.FC<Props> = ({
   meal,
   onDelete,
   onChange,
   loading
}) => {
  return (
    <div className="card mb-2">
      <div className="card-body text-center">
        <h3 className="card-header text-uppercase">{meal.schedule}</h3>
        <p className="card-text text-capitalize">{meal.description}</p>
        <span>{meal.calories} KCal</span>
        <div className="card-footer">
          <button
            className="btn btn-danger me-2"
            disabled={loading}
            onClick={onDelete}
          >
            {loading ? <ButtonSpinner/> : 'Delete'}
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={onChange}
          >Edit</button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;