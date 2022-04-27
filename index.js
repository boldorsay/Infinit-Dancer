import App from "./js/App.js";

let song = document.getElementById("w3review");


window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  // audio.play();

});

window.onload = () => {
  new App();

};

// import App from "./js/App.js";


// document.getElementById("w3review").addEventListener("click", displayDate);

// function displayDate() {
//   const audio = document.querySelector("audio");
//   audio.volume = 0.2;
//   audio.play();
// }


// window.onload = () => {
//   new App();

// };

