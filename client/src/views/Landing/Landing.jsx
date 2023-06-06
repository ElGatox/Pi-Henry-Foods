import style from "../Landing/Landing.module.css";
import { Link } from "react-router-dom";
import landingImage from "../../Images/Landing2.png";

const Landing = () => {
  return (
    <div className={style.backColor}>
    <div className={style.allContainer}>
      <div className={style.textsContainer}>
      <div className={style.textLife}> UP! </div>

      <div className={style.textLife1}> Soluciones Ricas </div>

      <div className={style.textLife2}>
        {" "}
        Para preparar uno mismo o encargarnos a nosotros que las hagamos por ti.{" "}
      </div>

      <div className={style.textLife3}>
        <Link className={style.Link} to="/home">
          {" "}
          {`Comenzar`}{" "}
        </Link>
      </div>
      </div>
      <div className={style.imageContainer}>
        <img className={style.image} src={landingImage} alt="img not found" />
      </div>
    </div>
    </div>
  );
};

export default Landing;
