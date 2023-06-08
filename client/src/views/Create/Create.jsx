import React, { useState } from "react";
import style from "../Create/Create.module.css";
import { useDispatch } from "react-redux";
import { newRecipe } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import defaultCreate from "../../Images/fomrsideC.png";

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

  const onAdd = (event) => {
    event.preventDefault();
    setDataForm((prev) => ({
      ...prev,
      steps: [...prev.steps, { number: prev.steps.length, steps: "" }],
    }));
  };

  const handleChange = (e) => {
    if (e.target.name === "healthScore") {
    }

    setDataForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(dataForm);
    setErrors(validationErrors);
   
    if (Object.keys(validationErrors).length === 0 || !validationErrors.steps) {
      try {
        dispatch(newRecipe(dataForm, history));
        console.log("Valid data:", dataForm);
        alert("La receta se guardó correctamente");
      } catch (error) {
        console.error("No se pudo crear tu receta:", error);
      }
    }
  };

  const validateForm = (form) => {
    let errors = {};

    if (!dataForm.name || !dataForm.name.trim()) {
      errors.name = 'El campo "nombre de receta" es obligatorio.';
    } else {
      const trimmedName = dataForm.name.trim();

      if (/\d/.test(trimmedName)) {
        errors.name = 'El campo "nombre de receta" no puede contener números.';
      }

      if (trimmedName.length > 60) {
        errors.name = 'El campo "nombre de receta" no puede tener más de 60 caracteres.';
      }
    }

    if (!form.summary) {
      errors.summary = "Resumen requerido";
    }

    if (typeof dataForm.healthScore === "undefined") {
      errors.healthScore = 'El campo "Health Score" es obligatorio.';
    } else {
      if (!dataForm.healthScore) {
        errors.healthScore = 'El campo "Health Score" no puede estar vacío.';
      } else {
        dataForm.healthScore = parseInt(dataForm.healthScore);

        if (dataForm.healthScore < 0 || dataForm.healthScore > 100) {
          errors.healthScore =
            'El campo "healthScore" debe estar entre 0 y 100.';
        }
      }
    }

    if (dataForm.steps.length === 1) {
      errors.steps = "Hace falta agregar este campo.";
    } else {
      errors.steps = "";
    }

    if (!form.diets.length) {
      errors.diets = "Elige al menos una dieta";
    }

    if (!dataForm.diets || dataForm.diets.length === 0) {
      errors.diets = 'El campo " tipos de dietas" es obligatorio.';
    }

    if (!dataForm.image || !dataForm.image.trim()) {
      errors.image = 'El campo "Imagen Url" es obligatorio.';
    } else {
      const trimmedImage = dataForm.image.trim();
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlPattern.test(trimmedImage)) {
        errors.image = 'El campo "Imagen Url" debe ser una URL válida.';
      }
    }

    return errors;
  };

  return (
    <div>
      <div className={style.majorContainer}>
        <div className={style.imageContainer}>
          <img src={defaultCreate} alt="Recipe" className={style.image} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={style.allContainer}>
            <div className={style.comunStyles7}>
              <label className={style.label}>Nombre de la Receta:</label>
              <input
                type="text"
                className={style.formControl}
                value={dataForm.name}
                name={"name"}
                onChange={(event) => handleChange(event)}
              />
              <p>{errors.name}</p>
            </div>

            <div className={style.comunStyles1}>
              <label className={style.label2}>Resumen:</label>
              <input
                type="text"
                className={style.formControl1}
                value={dataForm.summary}
                name={"summary"}
                onChange={(event) => handleChange(event)}
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
              />
              <p>{errors.healthScore}</p>
            </div>

            <div className={style.comunStyles3}>
              <label className={style.label4}>Url de la Imagen:</label>
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
              <label className={style.label5}>Tipos de Dieta:</label>
              <select
                multiple
                value={dataForm.diets}
                name={"diets"}
                className={style.formControl}
                onChange={(event) => {
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
                <input
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
