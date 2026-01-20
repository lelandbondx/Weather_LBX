function getWeather() {
    const city = document.getElementById('cityInput').value || 'Boston';
    const apiKey = '15c6e7fafb6eadd1988b369b7f4796eb'; // Replace with your actual OpenWeatherMap key if this one isn't working
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
        .catch(error => {
            document.getElementById('weatherDisplay').innerHTML = '<p>Oops! Check internet or API key</p>';
            console.error('Error:', error);
        });
}

function showAnimation(weather) {
    const container = document.getElementById('animationContainer');
    container.innerHTML = ''; // Clear previous

    // Add weather animations
    if (weather.includes('Clear') || weather.includes('Sunny')) {
        const sun = document.createElement('div');
        sun.className = 'sun';
        container.appendChild(sun);

    } else if (weather.includes('Rain') || weather.includes('Drizzle')) {
        for (let i = 0; i < 20; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 1.2}s`;
            container.appendChild(drop);

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
            flake.style.animationDuration = `${4 + Math.random() * 6}s`;
            container.appendChild(flake);
        }

    } else if (weather.includes('Thunderstorm')) {
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
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        container.appendChild(cloud);
    }

    // Add cool dancing pixel people and animals
    const person = document.createElement('div');
    person.className = 'person dancing person1';

    const personHead = document.createElement('div');
    personHead.className = 'person-head';
    person.appendChild(personHead);

    const personBody = document.createElement('div');
    personBody.className = 'person-body';
    person.appendChild(personBody);

    const leftArm = document.createElement('div');
    leftArm.className = 'left-arm';
    person.appendChild(leftArm);

    const rightArm = document.createElement('div');
    rightArm.className = 'right-arm';
    person.appendChild(rightArm);

    container.appendChild(person);

    const animal = document.createElement('div');
    animal.className = 'animal dancing animal1';

    const animalHead = document.createElement('div');
    animalHead.className = 'animal-head';
    animal.appendChild(animalHead);

    const animalBody = document.createElement('div');
    animalBody.className = 'animal-body';
    animal.appendChild(animalBody);

    const leftEar = document.createElement('div');
    leftEar.className = 'left-ear';
    animal.appendChild(leftEar);

    const rightEar = document.createElement('div');
    rightEar.className = 'right-ear';
    animal.appendChild(rightEar);

    container.appendChild(animal);

    // Apply reactions to both sprites
    [person, animal].forEach(sprite => {
        if (weather.includes('Clear') || weather.includes('Sunny')) {
            sprite.classList.add('waving');

        } else if (weather.includes('Rain') || weather.includes('Drizzle')) {
            const umbrella = document.createElement('div');
            umbrella.className = 'umbrella';
            sprite.appendChild(umbrella);

        } else if (weather.includes('Snow')) {
            sprite.classList.add('shivering');

        } else if (weather.includes('Thunderstorm')) {
            sprite.classList.add('scared');

        } else if (weather.includes('Fog') || weather.includes('Mist') || weather.includes('Haze')) {
            sprite.classList.add('peeking');

        }
    });
}

// Auto-load for instant appearance
getWeather();
