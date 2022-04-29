
const app = document.querySelector('.application');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
document.body.style.backgroundImage = "url('https://source.unsplash.com/2560x1440/?nature')";

let cityInput = "London";

cities.forEach((city) => {
  city.addEventListener('click', (e) => {

    cityInput = e.target.innerHTML;

    fetchWeatherData();
  
    app.style.opacity = "0";
  });
})

form.addEventListener('submit', (e) => {

  if(search.value.length == 0) {
    alert('Please type in a city name');
  } else {
 
    cityInput = search.value;

    fetchWeatherData();

    search.value = "";

    app.style.opacity = "0";
  }
  e.preventDefault();
});
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData() {

fetch(`https://api.weatherapi.com/v1/current.json?key=e0c1a083d9094ababd0211848210510&q=${cityInput}`)

  .then(response => response.json())
  .then(data => {
   
    console.log(data);
    

    temp.innerHTML = data.current.temp_c + "°";
    conditionOutput.innerHTML = data.current.condition.text;
    
 
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const d = parseInt(date.substr(5, 2));
    const m = parseInt(date.substr(8, 2));
    const time = date.substr(11); 
    

    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;
    
    nameOutput.innerHTML = data.location.name;

    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

    icon.src = "./icons/" + iconId;
    

    cloudOutput.innerHTML = data.current.cloud + "%";
    humidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.wind_mph + "mph";
    
    

    let timeOfDay = "day";
  
    const code = data.current.condition.code; 

    app.style.opacity = "1";
  })
  .catch(() => {
    alert('City not found, please try again');
    app.style.opacity = "1";
  });
}
fetchWeatherData();


  




