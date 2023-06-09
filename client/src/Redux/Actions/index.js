import axios from "axios";
import {
  GET_RECIPES,
  GET_DIETS,
  NEW_RECIPE,
  FILTER_SORT_NAME,
  GET_RECIPES_ID,
  GET_RECIPES_NAME,
  FILTER_SORT_HEALTH_SCORE,
  FILTER_BY_DIETS,
  LOADING,

  NEXT_PAGE,
  PREV_PAGE,
  CHANGE_PAG,
  GET_RECIPES_DB,
  CLEAR_DETAILS,
} from "./Actions-types";

const URL = process.env.REACT_APP_URL;

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/recipes`);
      if (!data.length) throw new Error("No recipes");

      return dispatch({
        type: GET_RECIPES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export function getRecipesDb() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/recipes/db`);

      if (!data.length) throw new Error("No recipes");

      return dispatch({
        type: GET_RECIPES_DB,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/diets`);

      if (!data.length) throw new Error("No diets");

      return dispatch({
        type: GET_DIETS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getRecipesId = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/recipes/${id}`);

      return dispatch({
        type: GET_RECIPES_ID,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export function clearDetails() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_DETAILS,
    });
  };
}

export function getRecipesName(name) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/recipes/?name=${name}`);

      dispatch({
        type: GET_RECIPES_NAME,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data)
    }
  };
}

export function newRecipe(formData, history) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/recipes`, formData);
      history.push(`/detail/${data.id}`);
      return dispatch({
        type: NEW_RECIPE,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}



export function loading(isLoading) {
  return {
    type: LOADING,
    payload: isLoading,
  };
}

export function filter(orden) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_SORT_NAME,
      payload: orden,
    });
  };
}

export function filterByHealth(orden) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_SORT_HEALTH_SCORE,
      payload: orden,
    });
  };
}

export function filterByDiet(diet) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_BY_DIETS,
      payload: diet,
    });
  };
}

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};
export const prevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export const changePag = (pagenumber) => {
  return {
    type: CHANGE_PAG,
    payload: pagenumber++,
  };
};
