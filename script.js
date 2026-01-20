function getWeather() {
    const city = document.getElementById('cityInput').value || 'Boston';
    const apiKey = '15c6e7fafb6eadd1988b369b7f4796eb'; // Your key - replace if needed
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
    container.innerHTML = ''; // Clear previous

    // Weather animations
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

    // Cool Dancing Pixel People and Animals
    const character = document.createElement('div');
    character.className = 'character dancing';

    const head = document.createElement('div');
    head.className = 'character-head';
    character.appendChild(head);

    const body = document.createElement('div');
    body.className = 'character-body';
    character.appendChild(body);

    const leftArm = document.createElement('div');
    leftArm.className = 'character-arm left-arm';
    character.appendChild(leftArm);

    const rightArm = document.createElement('div');
    rightArm.className = 'character-arm right-arm';
    character.appendChild(rightArm);

    // Animal (bunny-like)
    const animal = document.createElement('div');
    animal.className = 'animal dancing';

    const animalHead = document.createElement('div');
    animalHead.className = 'animal-head';
    animal.appendChild(animalHead);

    const animalBody = document.createElement('div');
    animalBody.className = 'animal-body';
    animal.appendChild(animalBody);

    const leftEar = document.createElement('div');
    leftEar.className = 'animal-ear left-ear';
    animal.appendChild(leftEar);

    const rightEar = document.createElement('div');
    rightEar.className = 'animal-ear right-ear';
    animal.appendChild(rightEar);

    // Apply reactions to both
    [character, animal].forEach(sprite => {
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

        container.appendChild(sprite);
    });
}
