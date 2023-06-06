import React, { useState } from "react";
import style from "../Create/Create.module.css";
import { useDispatch } from "react-redux";
import { newRecipe } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import defaultCreate from "../../Images/fomrsideC.png";

const defaultImagePath = defaultCreate;

let validName = (str) => {
  let string = /^[a-zA-Z\s]+$/;
  return string.test(str);
};

const validateForm = (form) => {
  let errors = {};

  if (!form.name) {
    errors.name = "Name required";
  } else if (!validName(form.name)) {
    errors.name = "Name invalid";
  } else {
    errors.name = " ";
  }

  if (!form.summary) {
    errors.summary = "Summary required";
  }

  if (form.healthScore < 1 || form.healhtScore > 100) {
    errors.healthScore = "Number between 1-100";
  }

  if (!form.steps) {
    errors.steps = "Steps required";
  }
  if (!form.diets.length) {
    errors.diets = "Select at least one diet";
  }

  if (!form.image) {
    errors.image = "se usara default";
  }
  return errors;
};

const FormularioReceta = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dataForm, setDataForm] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: [{ number: 1, step: "" }],
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: "",
  });

  const stepChange = (e, index) => {
    setDataForm((prev) => {
      const steps = [...prev.steps];
      steps[index].step = e.target.value;
      return {
        ...prev,
        steps,
      };
    });
  };

  const onAdd = () => {
    setDataForm((prev) => ({
      ...prev,
      steps: [...prev.steps, { number: prev.steps.length, steps: "" }],
    }));
  };

  const handleChange = (e) => {
    if (e.target.name === "healthScore") {
    }
    if (e.target.name === "image" && e.target.value === " ") {
      setDataForm((prev) => ({
        ...prev,
        image: defaultImagePath,
      }));
    } else {
      setDataForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
    setErrors(validateForm({ ...dataForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(newRecipe(dataForm, history));
  };
  console.log(dataForm.diets);
  return (
    <div>
      <div className={style.majorContainer}>
      <div className={style.imageContainer}>
  <img src={defaultCreate} alt="Recipe" className={style.image} />
</div>
      
        <form onSubmit={handleSubmit}>
          <div className={style.allContainer}>
            <div className={style.comunStyles7}>
              <label className={style.label}>Recipe Name:</label>
              <input
                type="text"
                className={style.formControl}
                value={dataForm.name}
                name={"name"}
                onChange={(event) => handleChange(event)}
                required
              />
              <p>{errors.name}</p>
            </div>

            <div className={style.comunStyles1}>
              <label className={style.label2}>Summary:</label>
              <input
                type="text"
                className={style.formControl1}
                value={dataForm.summary}
                name={"summary"}
                onChange={(event) => handleChange(event)}
                required
              />
              <p>{errors.summary}</p>
            </div>

            <div className={style.comunStyles2}>
              <label className={style.label3}>Health Score:</label>
              <input
                type="number"
                value={dataForm.healthScore}
                name={"healthScore"}
                className={style.formControl}
                onChange={(event) => handleChange(event)}
                required
              />
              <p>{errors.healthScore}</p>
            </div>

            <div className={style.comunStyles3}>
              <label className={style.label4}>Imagen Url:</label>
              <input
                type="text"
                className={style.formControl2}
                value={dataForm.image}
                name={"image"}
                onChange={(event) => handleChange(event)}
              />
              <p>{errors.image}</p>
            </div>

            <div className={style.comunStyles4}>
           
              <label className={style.label5}>Tipos de dieta:</label>
              <select
                multiple
                value={dataForm.diets}
                name={"diets"}
                className={style.formControl}
              
                onChange={(event) => {
                  console.log("HLIS OTRA VEZ");
                  if (!dataForm.diets.includes(event.target.value)) {
                    
                    setDataForm((prev) => ({
                      ...prev,
                      diets: [...prev.diets, event.target.value],
                    }));
                  } else {
                  
                    setDataForm((prev) => ({
                      ...prev,
                      diets: prev.diets.filter(
                        (diet) => diet !== event.target.value
                      ),
                    }));
                  }
                }}
              >
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="lacto ovo vegetarian">
                  Lacto-Ovo-Vegetarian
                </option>
                <option value="primal">Primal</option>
                <option value="fodmap friendly">Fodmap Friendly</option>
                <option value="whole 30">Whole-30</option>
              </select>
              <p>{errors.diets}</p>
            </div>
            <div className={style.comunStyles}>
              <label className={style.label6}>Pasos a Seguir: </label>
              {dataForm.steps.map((element, index) => (
                <textarea
                key={`textarea-${index}`}
                  value={element.step}
                  name={"steps"}
                  className={style.formControl}
                  onChange={(event) => stepChange(event, index)}
                />
              ))}
              <p>{errors.steps}</p>
              <button className={style.button} type="" onClick={onAdd}>
                {" "}
                Agregar Paso
              </button>
            </div>
            
            </div>
            <div className={style.buttonContainer}>
              <button className={style.button1} type="submit">
                Crear receta
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioReceta;
