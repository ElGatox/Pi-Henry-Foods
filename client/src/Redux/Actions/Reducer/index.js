import {
  GET_RECIPES,
  GET_DIETS,
  GET_RECIPES_NAME,
  CREATE_RECIPE,
  GET_RECIPES_ID,
  FILTER_SORT_NAME,
  FILTER_SORT_HEALTH_SCORE,
  FILTER_BY_DIETS,
  LOADING,
  NEW_RECIPE,
  PREV_PAGE,
  CHANGE_PAG,
  NEXT_PAGE,
  GET_RECIPES_DB,
  CLEAR_DETAILS,
} from "../Actions-types";

const initialState = {
  loading: false,
  backupRecipes: [],
  recipes: [],
  diets: [],
  details: {},

  newRecipeCreate: false,
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };

    case CHANGE_PAG:
      return {
        ...state,
        currentPage: action.payload,
      };

    case GET_RECIPES_NAME:
      return {
        ...state,
        currentPage: 1,
        recipes: action.payload,
        backupRecipes: action.payload,
      };


    case GET_RECIPES_ID:
      return { ...state, details: action.payload };

    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        backupRecipes: action.payload,
      };

    case GET_DIETS:
      return { ...state, diets: action.payload };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        details: action.payload,
      };

    case FILTER_SORT_NAME:
      if (action.payload === "asc") {
        return {
          ...state,
          currentPage: 1,
          recipes: [
            ...state.recipes.sort((prev, next) => {
              if (prev.name > next.name) return 1;
              if (prev.name < next.name) return -1;
              return 0;
            }),
          ],
        };
      } else {
        return {
          ...state,
          currentPage: 1,
          recipes: [
            ...state.recipes.sort((prev, next) => {
              if (prev.name > next.name) return -1;
              if (prev.name < next.name) return 1;
              return 0;
            }),
          ],
        };
      }

    case FILTER_SORT_HEALTH_SCORE:
      if (action.payload === "saludable") {
        return {
          ...state,
          currentPage: 1,
          recipes: [
            ...state.recipes.sort((prev, next) => {
              if (prev.healthScore > next.healthScore) return -1;
              if (prev.healthScore < next.healthScore) return 1;
              return 0;
            }),
          ],
        };
      } else {
        return {
          ...state,
          currentPage: 1,
          recipes: [
            ...state.recipes.sort((prev, next) => {
              if (prev.healthScore > next.healthScore) return 1;
              if (prev.healthScore < next.healthScore) return -1;
              return 0;
            }),
          ],
        };
      }

    case GET_RECIPES_DB:
      return {
        ...state,
        backupRecipes: action.payload,
        recipes: action.payload,
      };

    case FILTER_BY_DIETS:
      const recipesByDiet = state.backupRecipes;
      const dietFilter =
        action.payload === "All"
          ? recipesByDiet
          : recipesByDiet.filter((r) => r.diets.includes(action.payload));
      return {
        ...state,
        currentPage: 1,
        recipes: dietFilter,
      };

    
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case NEW_RECIPE:
      return {
        ...state,
        details: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
