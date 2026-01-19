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
  function showAnimation(weather) {
    const container = document.getElementById('animationContainer');
    container.innerHTML = ''; // Clear previous

    if (weather.includes('Clear') || weather.includes('Sunny')) {
        const sun = document.createElement('div');
        sun.className = 'sun';
        container.appendChild(sun);

    } else if (weather.includes('Rain') || weather.includes('Drizzle')) {
        for (let i = 0; i < 20; i++) { // More drops
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 1.2}s`;
            container.appendChild(drop);

            // Add splash at bottom
            if (Math.random() > 0.5) {
                const splash = document.createElement('div');
                splash.className = 'rain-splash';
                splash.style.left = `${Math.random() * 100}%`;
                splash.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(splash);
            }
        }

    } else if (weather.includes('Snow')) {
        for (let i = 0; i < 15; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.animationDelay = `${Math.random() * 5}s`;
            flake.style.animationDuration = `${4 + Math.random() * 6}s`; // Vary speed
            container.appendChild(flake);
        }

    } else if (weather.includes('Thunderstorm')) {
        // Lightning + rain
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        container.appendChild(lightning);

        for (let i = 0; i < 15; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 1}s`;
            container.appendChild(drop);
        }

    } else if (weather.includes('Fog') || weather.includes('Mist') || weather.includes('Haze')) {
        const fog1 = document.createElement('div');
        fog1.className = 'fog';
        container.appendChild(fog1);

        const fog2 = document.createElement('div');
        fog2.className = 'fog';
        fog2.style.animationDelay = '10s';
        container.appendChild(fog2);

    } else if (weather.includes('Cloud')) {
        // Keep your existing cloud or add more
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        container.appendChild(cloud);
    }
}
