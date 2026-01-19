function getWeather() {
    const city = document.getElementById('cityInput').value || 'Boston';
    const apiKey = '15c6e7fafb6eadd1988b369b7f4796eb'; // ← Paste your key here!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                document.getElementById('weatherDisplay').innerHTML = '<p>City not found!</p>';
                return;
            }
            const weather = data.weather[0].main;
            const temp = Math.round(data.main.temp);
            const display = `
                <p>${data.name}</p>
                <p>${weather}</p>
                <p>${temp}°F</p>
            `;
            document.getElementById('weatherDisplay').innerHTML = display;
            showAnimation(weather);
        })
        .catch(() => {
            document.getElementById('weatherDisplay').innerHTML = '<p>Oops! Check internet</p>';
        });
}

function showAnimation(weather) {
    const container = document.getElementById('animationContainer');
    container.innerHTML = '';

    if (weather.includes('Clear') || weather.includes('Sunny')) {
        const sun = document.createElement('div');
        sun.className = 'sun';
        container.appendChild(sun);
    } else if (weather.includes('Rain') || weather.includes('Drizzle')) {
        for (let i = 0; i < 15; i++) {
            const rain = document.createElement('div');
            rain.className = 'rain';
            rain.style.left = `${Math.random() * 100}%`;
            rain.style.animationDelay = `${Math.random() * 0.8}s`;
            container.appendChild(rain);
        }
    } else if (weather.includes('Cloud')) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        container.appendChild(cloud);
    }
}
