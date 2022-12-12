export interface Meal {
  id: string;
  schedule: string;
  description: string;
  calories: string;
}

export type ApiMeal = Omit<Meal, 'id'>;

export interface ApiMealsList {
  [id: string]: ApiMeal;
}

