import style from "../SearchBar/SearchBar.module.css";
import React from "react";
import { useState } from "react";
import { getRecipesName } from "../../Redux/Actions/index";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [recipe, setRecipe] = useState("");
  //const [recipeFound, setRecipeFound] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setRecipe(event.target.value);
  };

  const handleClick = () => {
    dispatch(getRecipesName(recipe));
  };

  return (
    <div className={style.contenedorSearchBar}>
      <p className={style.titulo}> BUSCA ENTRE NUESTRAS RECETAS </p>
      <div className={style.searchBar}>
        <input
          value={recipe}
          onChange={handleChange}
          className={style.input}
          type="search"
        />
        <button onClick={handleClick} className={style.button}>
          Buscar
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
