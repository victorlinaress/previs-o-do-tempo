document.querySelector(".search").addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  let input = document.querySelector("#city-input").value; 
  console.log(input);

  if (input !== "") {

    clearInfo();

    showWarning("Carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=533d6125e32955b46f4cb8f8c089953d&units=metric&lang=pt_br`;

    let results = await fetch(url); 
    let json = await results.json(); 
    console.log(json);

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
        humidity: json.main.humidity,
      });
    } else {
      clearInfo();
      showWarning("Não encontramos esta localização.");
    }
  } else {
    clearInfo();
  }
});
function showInfo(json) {
  showWarning("");

  document.querySelector(".resultado").style.display = "block";
  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${Math.round(
    json.temp
  )} <sup>°C</sup>`;

  document.querySelector(
    ".wind span"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector(".umidity span").innerHTML = `${json.humidity}`;
  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}
