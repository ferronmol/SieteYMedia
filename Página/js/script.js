//  Array de cartas


// Para añadir las cartas
let jugador_visor = document.getElementById("jugador_visor");
let maquina_visor = document.getElementById("maquina_visor");

// Textos de salida
let jugador_titulo = document.getElementById("jugador_titulo");
let maquina_titulo = document.getElementById("maquina_titulo");

// Botones
let pedir = document.getElementById("pedir"); // Botón de pedir carta
let plantarse = document.getElementById("plantarse"); // Botón de plantarse
let nueva_partida = document.getElementById("nueva_partida"); // Botón de nueva partida

// Variables globales para guardar la jugada del jugador y de la máquina
let jugada = 0; // Jugada de la máquina
let jugadaJugador = 0;    // Jugada del jugador

/**
 * function to create a card by cholet cartas = [
  "01oros.jpg",
  "02oros.jpg",
  "03oros.jpg",
  "04oros.jpg",
  "05oros.jpg",
  "06oros.jpg",
  "07oros.jpg",
  "10oros.jpg",
  "11oros.jpg",
  "12oros.jpg",
  "01bastos.jpg",
  "02bastos.jpg",
  "03bastos.jpg",
  "04bastos.jpg",
  "05bastos.jpg",
  "06bastos.jpg",
  "07bastos.jpg",
  "10bastos.jpg",
  "11bastos.jpg",
  "12bastos.jpg",
  "01espadas.jpg",
  "02espadas.jpg",
  "03espadas.jpg",
  "04espadas.jpg",
  "05espadas.jpg",
  "06espadas.jpg",
  "07espadas.jpg",
  "10espadas.jpg",
  "11espadas.jpg",
  "12espadas.jpg",
  "01copas.jpg",
  "02copas.jpg",
  "03copas.jpg",
  "04copas.jpg",
  "05copas.jpg",
  "06copas.jpg",
  "07copas.jpg",
  "10copas.jpg",
  "11copas.jpg",
  "12copas.jpg",
];osing a random source to set
 */
const createCard = () => {
  const card = document.createElement('IMG') //create img element
  card.src = './imagenes/'+cartas[Math.floor(Math.random() * (cartas.length -1))] //importante parentesis
  card.classList.add('card') //le voy a dar una clase a la imagen para que se vea mas bonita
  return card
}
/**
 * function to get value form real card by using susbstring in card.src
 * 
 * @param {HTMLImageElement} card 
 * @return number value from real card
 */
const getScore = (card) => { //funcion para obtener el valor de la carta
  return card.src.substring(card.src.lastIndexOf('/') + 1,card.src.lastIndexOf('/') + 3) //obtengo el valor de la carta a partir de la url de la imagen de la carta , en +1 
}
/**
 * function to set score for palyer each time him choose to flip a card
 * 
 * @param {string} score 
 */
const setScore = (score,player) => {
  if(score < 10 ){ //si el valor de la carta es menor que 10
    score = score[1] //obtengo el segundo caracter del string
  }else{
    score = '0.5' //si no es menor que 10 es un 10 o un 11 o un 12, por lo que es un 0.5
  }
  if(player == 'user'){
    if(jugador_titulo.textContent != ''){
      jugador_titulo.textContent  = parseFloat(score) + parseFloat(parseFloat(jugador_titulo.textContent))
    }else{
      jugador_titulo.textContent = score
    }
    if(parseFloat(jugador_titulo.textContent) > 7.5){ //si el jugador se pasa de 7.5
      //disabled button to keep playing
      pedir.disabled = true
      machineStartsGame()
     }
  }else{
    if(maquina_titulo.textContent != ''){
      maquina_titulo.textContent  = parseFloat(score) + parseFloat(parseFloat(maquina_titulo.textContent)) //sumo el valor de la carta a la jugada de la maquina
    }else{
      maquina_titulo.textContent = score
    }
  }
  
}
/**
 * function for show a card through screen
 * 
 * @param {HTMLImageElement} card 
 */
const putCard = (card,player) => { //funcion para mostrar la carta en pantalla
  if(player == 'user'){
    jugador_visor.appendChild(card)
  }else{
    maquina_visor.appendChild(card)
  }
}
/**
 * function for calling function to create and insert a card end its score
 */
const pedirCarta = (player) => {
  //storage img html element in a variable
  const card = createCard();
  //insert a card into DOM
  putCard(card,player)
  //get score form a card and set score for player 
  setScore(getScore(card),player);
}
const winner = (player) => {
  if(player == 'machine'){
    let score = maquina_titulo.textContent
    maquina_titulo.textContent = 'LA MAQUINA HA GANADO LA PARTIDA CON ' + score + ' PUNTOS'
  }else{
    let score = jugador_titulo.textContent
    jugador_titulo.textContent = 'HAS GANADO LA PARTIDA CON ' + score + ' PUNTOS'
  }
}
const endGame = () => {  //quito los botones de pedir y plantarse y muestro el de nueva partida
  plantarse.classList.add('ocultar')
  pedir.classList.add('ocultar')
  nueva_partida.classList.add('mostrar')
}
/**
 * function to evaluate which is the winner
 */
const evaluateGame = () => { //evaluo quien ha ganado
  if((parseFloat(jugador_titulo.textContent) <= 7.5 
  && parseFloat(maquina_titulo.textContent) < parseFloat(jugador_titulo.textContent)) //si el jugador no se ha pasado de 7.5 y la maquina tiene menos puntos que el jugador
  || parseFloat(maquina_titulo.textContent) > 7.5){
    winner('player')
  }else{
    winner('machine')
  }
  endGame()
}
/**
 * function to make machine play automatically
 */
const machineStartsGame = () => {
  pedirCarta('machine')
  if(parseFloat(jugador_titulo.textContent) < 7.5){
    console.log('entro en el if')
    //machine wins with only one card
    while(parseFloat(jugador_titulo.textContent) >= parseFloat(maquina_titulo.textContent)){
      pedirCarta('machine')
    }
  }
  evaluateGame()

}
/**
 * function to dont let player keep playing by get button pedir disabled and let mahine begin to play
 */
const finJugador = () => {
  //disabled button to keep playing
  pedir.disabled = true
  //machine starts to play
  machineStartsGame()
}
/**
 * function to reload page to play again
 */
const reiniciarJuego = () => {
  location.reload()
}

// Funciones

// Eventos
// document.addEventListener("DOMContentLoaded", barajarCartas);
pedir.addEventListener("click", startGame => (
  pedirCarta('user')
));
plantarse.addEventListener("click", finJugador);
nueva_partida.addEventListener("click", reiniciarJuego);
