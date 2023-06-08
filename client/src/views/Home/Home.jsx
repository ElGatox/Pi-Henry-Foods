import React, { useEffect } from "react";
import Cards from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filter,
  filterByHealth,
  filterByDiet,
  getRecipesDb,
} from "../../Redux/Actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "../Home/Home.module.css";
import Paginado from "../../components/Paginado/Paginado";


const Home = () => {
  const dispatch = useDispatch();

  const { currentPage, recipes } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handlerFilterByDiet = (e) => {
    dispatch(filterByDiet(e.target.value));
  };

  let start = (currentPage - 1) * 9; // 0
  let end = currentPage * 9; //9
  let cantPages = Math.floor(recipes.length / 9); //11 paginas
  let viewRecipes = recipes.slice(start, end);

  const filterOrd = (event) => {
    const value = event.target.value;
    if (value === "asc" || value === "dsc") {
      dispatch(filter(value));
    }
    if (value === "saludable" || value === "noSaludable") {
      dispatch(filterByHealth(value));
    }
  };

  const getRecipeDb = (event) => {
    const value = event.target.value;
    if (value === "recipesbd") {
      dispatch(getRecipesDb(value));
    } else {
      dispatch(getRecipes());
    }
  };

  return (
    <div>
    
      <SearchBar />
      <label className={style.indicatorfilters}> FILTRA LAS RECETAS PARA FACILITAR TU BUSQUEDA</label>
      <div className={style.AllselectorsContainers}>
    
        <div className={style.selectorAContainer}>
      
          <select
            className={style.selectors}
            onChange={filterOrd}
            name=""
            id=""
          >
            <option value="asc">A-Z</option>
            <option value="dsc">Z-A</option>
            <option value="saludable">More Healthy</option>
            <option value="noSaludable">Less Healthy</option>
          </select>
        </div>
     
        <div className={style.selectorBcontainer}>
          
          <select
            id="filter2"
            className={style.selectors}
            onChange={(e) => {
              handlerFilterByDiet(e);
            }}
          >
            <option value="All"> Todas las dietas </option>
            <option value="gluten free"> Sin gluten </option>
            <option value="ketogenic"> Cetogénico </option>
            <option value="dairy free"> Libre de lácteos </option>
            <option value="lacto ovo vegetarian">
              {" "}
              Lacto-Ovo-Vegetariana{" "}
            </option>
            <option value="vegan"> Vegana </option>
            <option value="pescatarian"> Pescatariano </option>
            <option value="paleolithic"> Paleo </option>
            <option value="primal"> Primitiva </option>
            <option value="fodmap friendly"> FODMAP bajo </option>
            <option value="whole 30"> Entero 30 </option>
          </select>
        </div>
        <div className={style.selectorCcontainer}>
          <select
            id="filter3"
            className={style.selectors}
            onChange={(e) => {
              getRecipeDb(e);
            }}
          >
            <option value="allrecipes"> Todas </option>
            <option value="recipesbd"> Mis recetas </option>
          </select>
        </div>
      </div>
      <Cards viewRecipes={viewRecipes} />
      {!!recipes.length && <Paginado cantPages={cantPages} />}
 
    </div>
  );
};

export default Home;
