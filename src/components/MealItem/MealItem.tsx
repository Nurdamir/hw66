import React from 'react';
import {Meal} from "../../types";
import {Link} from "react-router-dom";

interface Props {
  meal: Meal;
  onDelete: React.MouseEventHandler;
}

const MealItem: React.FC<Props> = ({meal, onDelete}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3>{meal.schedule}</h3>
        <p>{meal.description}</p>
        <span>{meal.calories}</span>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
        <Link className="btn btn-warning" to={'/edit-meal/' + meal.id}>Edit</Link>
      </div>
    </div>
  );
};

export default MealItem;