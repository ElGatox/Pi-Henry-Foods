import React, { useEffect } from "react";
import style from "../Detail/Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesId, loading,clearDetails } from "../../Redux/Actions";
import  loadingGif from "../../Images/LoadingB.gif"

const Detail = () => {
  const { id } = useParams();

  const recipe = useSelector((state) => state.details);
  const isLoading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(true));
    dispatch(getRecipesId(id));
    return ()=>{
      dispatch(clearDetails())
    }
  }, []);

  return (
  
    <div>
      {!recipe.id && isLoading ? (
        <div className={style.loading}>
          <img src={loadingGif} alt="Loading" />
        </div>
      ) : (
        <div className={style.contenedor0}>
          <div className={style.healthScore}>
            <p className={style.text}> HealthScore: {recipe.healthScore}</p>
          </div>
       
          <div className={style.titles}>
            <h1 className={style.h2}>{recipe.name}</h1>
            <p className={style.h3}> Diets: {recipe.diets}</p>
            
            
          </div>


          <div className={style.imageContainer}>
            <img
              className={style.image}
              src={recipe.image}
              alt="foto del platillo"
            />
          </div>

          <div className={style.imageContainer1}>
            <p className={style.texto2}> HOLA ESTOY AQUÍ</p>
          </div>

          <div className={style.steps}>
            <h1 className={style.titulo}> ¡Hágalo usted mismo! </h1>
            {Array.isArray(recipe.steps) ? (
              recipe.steps.map((step, index) => {
                return (
                  <div className={style.pasitos} key={index}>
                    <span>
                      <b>Paso N°:</b> <b>{step.number}</b> {step.step}
                    </span>
                  </div>
                );
              })
            ) : (
              <p> no hay pasos</p>
            )}
          </div>

          <div className={style.containerImgSumm}>
            <div
              className={style.summary}
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
