
//Crea una constante de tipo objeto donde a nacimiento se le asigna la función que válida
const validadores = {
    nacimiento: (input) => validarFechaNacimiento(input),
};

//Crea un arreglo con los tipos de errores
const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

//Crea un objeto con los mensajes de error para cada caso
const mensajesErrores  = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío.",
      },
      email: {
        valueMissing: "El campo correo no puede estar vacío.",
        typeMismatch: "El correo no es válido, debido a que no cumple con el formato.",
      },
      password: {
        valueMissing: "El campo contraseña no puede estar vacío.",
        patternMismatch: "Al menos 8 caracteres, máximo 16, debe contener una letra minúscula, una letra mayúscula, un número.",
      },
      nacimiento: {
        valueMissing: "El campo de la fecha de nacimiento no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad.",
      },
      telefono:{
        valueMissing: "El campo de teléfono no puede estar vacío.",
        patternMismatch: "El teléfono no cumple los requisitos."
      },
      dirreccion:{
        valueMissing: "El campo no puede estar vacío.",
        patternMismatch: "El campo no cumple los requisitos. El campo debe de contener mínimo 10 caracteres y máximo 40"
      },
}

//Se crea la función que se encarga de validar los input´s y es la función que se exporta
export function validar(input){
    //Se crea una constante con el tipo de input
    const tipoInput  = input.dataset.tipo;

    //Se válida que exista una función para validar ese input
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    //Se encarga de agregar o remover la clase de error
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";

    //Recorre los tipos de errores
    tipoErrores.forEach( (error) => {
      console.log(error);
      console.log(input.validity[error]);
        //Válida que el tipo de error si tenga un mensaje asociado y lo asigna a la varible de mensaje
        if(input.validity[error]){
            mensaje = mensajesErrores[tipoInput][error];
        }
    });
    return mensaje;
}

function validarFechaNacimiento(input){
    let mensaje = "";
    const fechaNacimiento = new Date(input.value);

    if(!mayorEdad(fechaNacimiento)){
        mensaje = "Debe de tener al menos 18 años.";
    }
    
    input.setCustomValidity(mensaje);
};


function mayorEdad(fechaNacimiento){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fechaNacimiento.getFullYear() + 18, fechaNacimiento.getUTCMonth(), fechaNacimiento.getUTCDay());

    //Saca la diferencia entre las fechas
    const result = diferenciaFechas < fechaActual;
    return result;
};
