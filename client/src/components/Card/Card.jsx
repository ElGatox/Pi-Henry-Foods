import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={style.allContainer}>
      <Link to={`detail/${props.id}`} className={style.link}>
        <div className={style.card}>
          <div className={style.imageContainer}>
            <img
              className={style.image}
              src={props.image}
              alt="img not found"
            />
          </div>
          <div className={style.healtScoreContainer}>
            <h3 className={style.healtScore}>
              {" "}
              Health Score: {props.healthScore}
            </h3>
          </div>
          <div className={style.infoContainer}>
            <h3 className={style.name}>{props.name}</h3>

            <h5 className={style.diets}>Diets: {props.diets.join(", ")}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
