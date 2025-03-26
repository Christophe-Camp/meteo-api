let url = "https://api.open-meteo.com/v1/forecast?latitude=44.8404&longitude=-0.5805&daily=sunrise,sunset,weather_code,temperature_2m_max,apparent_temperature_min,temperature_2m_min,apparent_temperature_max&hourly=temperature_2m,rain,precipitation,weather_code&current=temperature_2m,wind_speed_10m,is_day,weather_code,wind_direction_10m,precipitation,rain&timezone=auto"
fetch(url)                   // on vient lier le fichier json apres avec le 1 er then on vien verifier si le fichier est bien charger 
  .then (function(response){
  return response.json();
  })
  .then(function(donnees){               // on viens chercher la fonction afficher liste
   console.log(donnees);
    let temperature = donnees.current.temperature_2m; //temperature
    let codeMeteo = donnees.current.weather_code; // Le code météo
    let jourNuit = donnees.current.is_day;  //le jour ou la nuit
    let wind = donnees.current.wind_speed_10m; // Vitesse du vent en km/h
    let windDirection = donnees.current.wind_direction_10m; // La direction du vent en degrés
    let hourlyTemperatures = donnees.hourly.temperature_2m;// Récupérer les prévisions de température par heures
    let hourlyRain = donnees.hourly.rain; //Récupérer les prévisions de pluie par heures
    let dailyTempsMax = donnees.daily.temperature_2m_max;  // Températures max
    let dailyTempsMin = donnees.daily.temperature_2m_min;  // Températures min
    let dailyWeatherCodes = donnees.daily.weather_code;    // Codes météo par jour
    let dailyDates = donnees.daily.time;                   // Dates des prévisions
   
    let latitude = donnees.latitude;
    let longitude = donnees.longitude;
    console.log(latitude);
    console.log(longitude);

    if (jourNuit === 1){
        document.getElementById("jourNuit").innerHTML =
    "<img src='assets/images/daynight/day.png' alt=''>";
    }else {
        document.getElementById("jourNuit").innerHTML =
    "<img src='assets/images/daynight/night.png' alt=''>";
    }

    function updateTime() {
      let date = new Date().toLocaleString("fr-FR", { timeZone: donnees.timezone });
      let couperDate = date.split(' ');                                               // Sépare la date et l'heure par un espace
      let jour = couperDate[0];                                                       // Premier élément : jour (ex: "25/03/2025")
      let heure = couperDate.slice(1).join(' ');                                      // Rassemble les éléments restants : heure (ex: "15:30:00")
      document.getElementById("dateTime").innerHTML =
    "<div class='jour'>" + jour + "</div> <div>" + heure + "</div>";
    }
    
    setInterval(updateTime, 60000);// Appel de la fonction updateTime toutes les secondes (1000 ms)
    updateTime();// Appel initial pour afficher immédiatement l'heure
    
let weatherBackgrounds = {                                          // Correspondances de codes météo aux images de fond
  0: "url('assets/images/sun.jpg')",   // Ensoleillé
  1: "url('assets/images/suncloud.jpg')",  // Partiellement nuageux
  2: "url('assets/images/cloudy.jpg')",  // Nuageux
  3: "url('assets/images/rain.jpg')",   // Pluvieux
  4: "url('assets/images/thunder.jpg')",  // Orageux
  5: "url('assets/images/snow.jpg')"    // Neigeux
};

document.body.style.backgroundImage = weatherBackgrounds[codeMeteo] || "url('assets/images/cloud.jpg')";// Mettre à jour le fond d'écran en fonction du code météo

document.getElementById("previsionJour").innerHTML =                    // Afficher la prévision du jour avec la température et une description
  getWeatherDescription(codeMeteo)+" <br>" + temperature + "°C";

function getWeatherDescription(code) {                                  // Fonction pour obtenir la description du temps en fonction du code
    switch (code) {
        case 0:
            return "Ensoleillé <img id='weatherIcon' src='assets/images/pictos/sun.png' alt='Météo'>";
        case 1:
            return "Partiellement nuageux <img id='weatherIcon' src='assets/images/pictos/suncloud.png' alt='Météo'>";
        case 2:
            return "Nuageux <img id='weatherIcon' src='assets/images/pictos/cloud.png' alt='Météo'>";
        case 3:
            return "Pluvieux <img id='weatherIcon' src='assets/images/pictos/rain.png' alt='Météo'>";
        case 4:
            return "Orageux <img id='weatherIcon' src='assets/images/pictos/thunder.png' alt='Météo'>";
        case 5:
            return "Neigeux <img id='weatherIcon' src='assets/images/pictos/snow.png' alt='Météo'>";
        default:
            return "Temps variable <img id='weatherIcon' src='assets/images/pictos/rainy.png' alt='Météo'>";
    }
}

function getWindDirection(degrees) {                                                  // Fonction pour convertir les degrés en direction cardinale
    const directions = ["Nord", "Nord-Est", "Est", "Sud-Est", "Sud", "Sud-Ouest", "Ouest", "Nord-Ouest"];
    const index = Math.floor((degrees + 22.5) / 45); // Divise 360° en 8 directions de 45° chacune
    return directions[index % 8]; // Renvoie la direction correspondante
}

// Conversion des degrés en direction cardinale
let windDirectionCardinal = getWindDirection(windDirection);

// Mettre à jour l'élément affichant la vitesse et la direction du vent
document.getElementById("wind-info").innerHTML =  wind + " km/ heure";

// Ajuster l'angle de l'aiguille de la boussole en fonction de la direction du vent
document.getElementById("compass-needle").style.transform = "translate(-50%, -50%) rotate(" + windDirection + "deg)";

// Fonction pour afficher l'état de la météo (pluie, température)
function updateWeather() {
  const carousel = document.getElementById('carousel');
 
  for (let i = 0; i < 24; i++) {                          // Afficher les informations de chaque heure dans le carrousel
    const hour = i;  // L'heure correspond à l'index
    const temperature = hourlyTemperatures[i];
    const rain = hourlyRain[i] || 0;  // Si pas de pluie, on met 0

    const weatherElement = document.createElement('div');
    const formattedTime = new Date(donnees.hourly.time[i]).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' });

    weatherElement.innerHTML = `
    <img src="assets/images/pictos/thermometer.png"> ${temperature}°C<br>
    <img src="assets/images/pictos/umbrella.png"> ${rain} mm <br>
    ${formattedTime}
    `;
    carousel.appendChild(weatherElement);// Appeler les fonctions pour afficher l'heure et la météo
  }
}
updateWeather();

let previsionsContainer = document.getElementById("previsionSemaine");
previsionsContainer.innerHTML = "";  // Reset du contenu

for (let i = 0; i < 6; i++) {
  let date = new Date(dailyDates[i]).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "2-digit" });
  let weatherIcon = getWeatherIcon(dailyWeatherCodes[i]);
  
  let previsionCard = document.createElement("div"); // Création d'une carte météo pour chaque jour
  previsionCard.classList.add("prevision-card");
  previsionCard.innerHTML = `
    <strong>${date}</strong><br>
    <img src=${weatherIcon} alt="Météo"><br>
    <strong> ${dailyTempsMax[i]}°C</strong><br>
    ${dailyTempsMin[i]}°C ` ;

  previsionsContainer.appendChild(previsionCard);
}

function getWeatherIcon(code) {
  switch (code) {
    case 0: return "assets/images/pictos/sun.png"; // Ensoleillé
    case 1: return "assets/images/pictos/suncloud.png"; // Partiellement nuageux
    case 2: return "assets/images/pictos/cloud.png"; // Nuageux
    case 3: return "assets/images/pictos/rain.png"; // Pluvieux
    case 4: return "assets/images/pictos/thunder.png"; // Orageux
    case 5: return "assets/images/pictos/snow.png"; // Neigeux
    default: return "assets/images/pictos/rainy.png"; // Par défaut
  }
}

  })
  .catch(function(error){
    console.error("Erreur lors du chargement du fichier :", error); // si il y a un problem dans le code le message apparait dans la console 
    document.getElementById("container").innerHTML ="Erreur de chargement"
  });