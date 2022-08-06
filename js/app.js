// 1- Crea una web con bootstrap y js, que contenga un botón comenzar el juego, en ese momento se crea un número aleatorio que el usuario deberá adivinar, la interfaz del usuario debe tener además un input para ingresar un número y un botón enviar, al presionar el botón enviar mostrar en un alert si el usuario adivino o no el número mágico, si no lo adivino indicarle con un alert si el numero que ingreso es mayor o menor al número mágico.
// Cuando el usuario adivine el numero mostrar un mensaje indicando al usuario que adivino el numero.

let generarNumero = () => {return Math.floor(Math.random() * (10 - 1 + 1) + 1);}
let nroAleatorio;

function comenzar() {
  nroAleatorio = generarNumero();
  //Elimiar boton
  let boton = document.getElementById("botonComenzar");
  boton.remove();


  //Creacion de la imagen de la ruleta
  let ruletaContainer = document.createElement("article");
  ruletaContainer.classList = "ruleta ruletaSelector";
  ruletaContainer.innerHTML = `<img class="w-100" src="img/ruleta.png" alt="Ruleta">`;

  //Añadir la imagen a la pagina
  let containerPadre = document.getElementById("sectionPadre");
  containerPadre.prepend(ruletaContainer);

  //Creacion del input y los botones
  let juegoContainer = document.createElement("article");
  juegoContainer.classList = "juegoContainer";
  juegoContainer.innerHTML = `
  <input
  class="fs-3 "
  min="1"
  max="10"
  />
  <div class="d-flex">
  <button class="btn btn-dark fs-3 w-50" onclick="adivinar()"">Adivinar</button>
  <button class="btn btn-danger fs-3 w-50" onclick="reiniciar()">Reiniciar</button>
  </div>`;

  //Añadir a la pagina el input y los botones
  containerPadre.appendChild(juegoContainer);
}

//Funcion para el boton de adivinar
function adivinar() {
  let inputAdivinar = document.querySelector("input");

  let ruletaContainer = document.getElementsByClassName("ruleta");
  let container = document.getElementById("fondo");

  //Creacion del texto de victoria
  let cartelAdivino = document.createElement("h2");
  let seleccionCartel = document.querySelector("h2");
  //Verificar si se acerto el numero

  if (parseInt(inputAdivinar.value) === nroAleatorio) {
    //Añadir a la pagina el cartel de Acierto
    cartelAdivino.className = "text-danger text-center display-2 my-4";
    cartelAdivino.innerHTML = `Acertó, el numero era: ${nroAleatorio}`;
    container.prepend(cartelAdivino);

    //Cambio de la clase de la ruleta para que se detenga al adivinar el nro
    ruletaContainer[0].classList.add("ruletaDetenida");
    ruletaContainer[0].classList.remove("ruleta");
  } else {
    //Añadir a la pagina el cartel de error
    cartelAdivino.className = "text-dark text-center display-2 my-4";
    cartelAdivino.innerHTML = `Falló, siga intentando`;
    container.prepend(cartelAdivino);
    
    //Hacer auto focus en el input cuando se falla el intento y resetear el valor del mismo
    inputAdivinar.focus();
    inputAdivinar.value = "";
  }
  //Remover el cartel anterior
  seleccionCartel.remove();
}

//Funcion para reiniciar el juego
function reiniciar() {
  nroAleatorio = generarNumero();

  //Eliminacion del cartel de acierto o error
  let seleccionCartel = document.querySelector("h2");
  seleccionCartel.remove();

  //Cambio de clase de la ruleta para que vuelva a girar
  let ruletaSelector = document.getElementsByClassName("ruletaSelector");
  ruletaSelector[0].classList.remove("ruletaDetenida");
  ruletaSelector[0].classList.add("ruleta");
}
