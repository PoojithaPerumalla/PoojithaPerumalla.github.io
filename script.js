const apiKey = "YOUR_API_KEY";

// Show login
function showLogin() {
    document.getElementById("startSection").style.display = "none";
    document.getElementById("loginSection").style.display = "flex";
}

// Enter main app
function enterApp() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("appSection").style.display = "block";
    startCamera();
    getLocation();
}

// Start camera
async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById("camera").srcObject = stream;
}

// Get location
function getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeather(lat, lon);
    });
}

// Get weather
async function getWeather(lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    document.getElementById("location").innerText = data.name;
    document.getElementById("temp").innerText =
        "Temperature: " + data.main.temp + "°C";
    document.getElementById("humidity").innerText =
        "Humidity: " + data.main.humidity + "%";
    document.getElementById("condition").innerText =
        "Condition: " + data.weather[0].main;

    changeBackground(data.weather[0].main);
}

// Change background based on weather
function changeBackground(condition) {
    if (condition === "Rain") {
        document.body.style.backgroundImage = "url('rain.jpg')";
    } else if (condition === "Clear") {
        document.body.style.backgroundImage = "url('sunny.jpg')";
    } else {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
    }
}
