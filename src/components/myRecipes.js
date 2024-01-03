import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Menu from "../style/Menu";
import { SET_RECIPE } from "../store/action";
import ShoppingList from "./shoppingList";
import { useNavigate } from 'react-router-dom';

import MyCard from '../style/card';

import '../App.css';
import { useDispatch, useSelector } from "react-redux";
function MyRecipes() {
  const dispatch = useDispatch()
  const recipes = useSelector(state => state.recipes);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: recipes,
  });
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/recipe")
      .then((response) => {
        dispatch({ type: SET_RECIPE, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function showList(userId) {
    console.log(userId);
    return <>{userId ? <ShoppingList userId={userId} /> : <h1>hi</h1>};</>
  }
  function details(recipe) {
    const link = `/detailsRecipe/${recipe.Id}`;
  }
  return (
    <div>
      <Menu />
      <br></br>
      <h1>All Recipes</h1>
      <div className="card-container">
        {recipes && recipes?.map((recipe) => (
            <MyCard recipe={recipe} />
        ))}
      </div>
    </div>

  );
}

export default MyRecipes;