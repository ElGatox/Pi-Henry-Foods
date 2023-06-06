
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";


const CardsContainer = ({ viewRecipes }) => {
 
  return (
    <div className={style.allCointainer}>
      <div className={style.container}>
        {viewRecipes &&
          viewRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                image={recipe.image}
                summary={recipe.summary}
                healthScore={recipe.healthScore}
                diets={recipe.diets}
                steps={recipe.steps?.map((step) => {
                  return `<b>${step.number}</b> ${step.step}<br>`;
                })}
                createInBd={recipe.createInBd}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CardsContainer;
