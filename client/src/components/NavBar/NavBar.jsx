import React from "react";
import { Link } from "react-router-dom";
import style from "../NavBar/NavBar.module.css";
import icon from "../../Images/icon3.png"

const Navbar = () => {
  return (
    <div className={style.navContainer}>
      <div className={style.imgContainer}>
        <Link to={"/"}>
          <img  className={style.icon} src={icon} alt="henryLogo" />
        </Link>
      </div>
      <div className={style.allContainer}>
        <div className={style.linkContainer}>
          <Link className={style.texto} to={"/home"}>
            HOME
          </Link>
          <Link className={style.texto} to={"/create"}>
            CREATE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
