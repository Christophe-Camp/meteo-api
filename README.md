🌦️ APPLICATION METEO
📌 Objectif
Cette application permet d'afficher les prévisions météo en utilisant l'API OpenWeather.
Elle est conçue pour être responsive, offrant une expérience optimale sur ordinateur, tablette et smartphone.

🎨 Spécificités graphiques
✔️ Données dynamiques : Le DOM est généré à partir de templates remplis avec les données de l’API.
✔️ Boussole dynamique : Elle s’oriente selon la direction du vent.
✔️ Format de date lisible : Affichage en JJ / MM / AAAA.
✔️ Arrière-plan adaptatif : L’image de fond change en fonction de la météo actuelle.

🔧 Méthodologie
1️⃣ Schématiser l'interface pour guider l'intégration.
2️⃣ Analyser les données JSON renvoyées par l’API.
3️⃣ Associer chaque élément du schéma à une clé JSON de l’API.
4️⃣ Intégrer le design en HTML & CSS.
5️⃣ Écrire un scénario détaillé du code JavaScript en français.
6️⃣ Définir des fonctions pour afficher dynamiquement les templates.
7️⃣ Implémenter la dynamique avec JavaScript.
8️⃣ Débugger :

Vérifier les erreurs dans VS Code et la console.

Utiliser console.log() pour tester les variables et suivre l’exécution du code.

🚀 Technologies utilisées
HTML / CSS → Structure et mise en page

JavaScript (ES6+) → Dynamisation du contenu

API OpenWeather → Récupération des données météo

📂 Structure du projet

/mon-projet-meteo\
│── /assets
│   ├── base
││   ├── global.scss\
│── /css\
│   ├── main.css\
│── fonts\
│── node\_modules\
│── index.html 
│── package-lock.json
│── package.json\
│── README.md
│── script.js

📌 Installation et utilisation
1️⃣ Cloner le projet

git clone https://github.com/votre-utilisateur/mon-projet-meteo.git
cd mon-projet-meteo
2️⃣ Ouvrir index.html dans un navigateur

🔹 Optionnel : Héberger le projet avec Live Server (VS Code).

https://christophe-camp.github.io/meteo-api/

📬 API OpenWeather
L’application utilise l'API OpenWeather.
👉 Inscription & clé API : https://openweathermap.org/api

💡 Exemple d’appel API en JavaScript :

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=VOTRE_CLE_API`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Erreur lors de la récupération des données", error));

🎯 Améliorations possibles
✅ Ajout de la géolocalisation pour afficher la météo actuelle automatiquement.
✅ Ajout d’une animation lors du changement de météo.
✅ Intégration d’un mode sombre.

👨‍💻 Auteur
Projet développé par Christophe Camp
🔗 GitHub