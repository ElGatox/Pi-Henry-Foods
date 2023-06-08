
export default function validation(recipeData) {
    const errors = {};
  
    if (!recipeData.name || !recipeData.name.trim()) {
      errors.name = 'El campo "name" es obligatorio.';
    } else {
      const trimmedName = recipeData.name.trim();
  
      if (/\d/.test(trimmedName)) {
        errors.name = 'El campo "name" no puede contener números.';
      }
  
      if (trimmedName.length > 60) {
        errors.name = 'El campo "name" no puede tener más de 60 caracteres.';
      }
    }
  
    if (!recipeData.image || !recipeData.image.trim()) {
      errors.image = 'El campo "image" es obligatorio.';
    } else {
      const trimmedImage = recipeData.image.trim();
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlPattern.test(trimmedImage)) {
        errors.image = 'El campo "image" debe ser una URL válida.';
      }
    }
  
    if (!recipeData.summary || !recipeData.summary.trim()) {
      errors.summary = 'El campo "summary" es obligatorio.';
    } else {
      if (typeof recipeData.summary !== 'string') {
        errors.summary = 'El campo "summary" debe ser una cadena de texto (string).';
      } else {
        recipeData.summary = recipeData.summary.trim();
      }
    }
  
    
  
   
  
    if (!recipeData.diets || recipeData.diets.length === 0) {
      errors.diets = 'El campo "diets" es obligatorio.';
    }
  
    return errors;
  }














  if (!recipeData.analyzedInstructions || !recipeData.analyzedInstructions.trim()) {
    errors.analyzedInstructions = 'El campo "Instructions" es obligatorio.';
  } else {
    if (typeof recipeData.analyzedInstructions !== 'string') {
      errors.analyzedInstructions = 'El campo "Instructions" debe ser una cadena de texto (string).';
    } else {
      recipeData.analyzedInstructions = recipeData.analyzedInstructions.trim();
    }
  }