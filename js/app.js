//Se importa la función de validar los inputs
import { validar } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

//Se hace un recorrido a todos los inputs y con el evento "Blur" se válida cuando se salga del input
inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        validar(input.target);
    });
});