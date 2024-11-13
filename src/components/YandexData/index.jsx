import React, { useEffect, useState } from 'react';

const YANDEX_MAPS_API_KEY = '78eb91a1-8baf-4f28-be21-30ad54e78407';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [smokeParticles, setSmokeParticles] = useState([]);

    useEffect(() => {
        if (!document.querySelector(`script[src*="api-maps.yandex.ru"]`)) {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=en_US`;
            script.async = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        }
    }, []);

    const initializeMap = () => {
        ymaps.ready(() => {
            const myMap = new ymaps.Map('map', {
                center: [41.2995, 69.2401],
                zoom: 12,
                controls: ['zoomControl'],
            });

            myMap.behaviors.disable('scrollZoom');
            setMap(myMap);
        });
    };

    const getRandomCoordinates = () => {
        const minLat = 41.25;
        const maxLat = 41.35;
        const minLon = 69.2;
        const maxLon = 69.3;
        const lat = minLat + Math.random() * (maxLat - minLat);
        const lon = minLon + Math.random() * (maxLon - minLon);
        return [lat, lon];
    };

    const getRandomPollutionLevel = () => {
        return Math.floor(Math.random() * 300); // Simulating pollution level in µg/m³
    };

    const getImpactAssessment = (level) => {
        if (level > 200) return 'High health risk';
        else if (level > 100) return 'Moderate health risk';
        return 'Low health risk';
    };

    const createSmokeParticle = (latitude, longitude) => {
        const pollutionLevel = getRandomPollutionLevel();
        const impact = getImpactAssessment(pollutionLevel);

        // Determine the color based on the pollution level
        let color;
        if (pollutionLevel > 200) {
            color = 'rgba(255, 0, 0, 0.6)'; // Red for high risk
        } else if (pollutionLevel > 100) {
            color = 'rgba(255, 165, 0, 0.6)'; // Orange for moderate risk
        } else {
            color = 'rgba(0, 255, 0, 0.6)'; // Green for low risk
        }

        const smokeParticle = new ymaps.Placemark(
            [latitude, longitude],
            { 
                hintContent: `Pollution Level: ${pollutionLevel} µg/m³`,
                balloonContent: `<b>Impact:</b> ${impact}<br><b>Pollution Level:</b> ${pollutionLevel} µg/m³`
            },
            {
                iconLayout: 'default#image',
                iconImageHref: createStaticSVG(color),
                iconImageSize: [30, 30], 
                iconImageOffset: [-15, -15],
            }
        );

        map.geoObjects.add(smokeParticle);
        return smokeParticle;
    };

    const createStaticSVG = (color) => {
        const svg = `
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="10" fill="${color}" />
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    const handleGenerate = () => {
        if (map) {
            // Clear any existing particles from the map
            smokeParticles.forEach(particle => map.geoObjects.remove(particle));
            setSmokeParticles([]);

            const particleCount = 15;
            let generatedCount = 0;

            const intervalId = setInterval(() => {
                if (generatedCount < particleCount) {
                    const [lat, lon] = getRandomCoordinates();
                    const newParticle = createSmokeParticle(lat, lon);

                    setSmokeParticles(prevParticles => [...prevParticles, newParticle]);
                    generatedCount++;
                } else {
                    clearInterval(intervalId);
                }
            }, 500); // Add a new particle every 500 milliseconds
        }
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            <button onClick={handleGenerate} className="btnGenerate">
                Generate Smoke Particles
            </button>
        </div>
    );
};

export default MapComponent;
