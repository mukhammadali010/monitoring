import React, { useEffect, useState } from 'react';

// Define API keys for Yandex Maps and OpenWeatherMap
const YANDEX_MAPS_API_KEY = '78eb91a1-8baf-4f28-be21-30ad54e78407';
const OPENWEATHERMAP_API_KEY = 'd58082d2702339083a04cf97256b417f';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [windDirection, setWindDirection] = useState(0);
    const [smokeParticles, setSmokeParticles] = useState([]);
    const [coloredPoints, setColoredPoints] = useState([]);

    useEffect(() => {
        // Load Yandex Maps API script dynamically
        if (!document.querySelector(`script[src*="api-maps.yandex.ru"]`)) {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAPS_API_KEY}&lang=en_US`;
            script.async = true;
            script.onload = initializeMap;
            document.body.appendChild(script);
        }
    }, []);

    // Initialize Yandex map
    const initializeMap = () => {
        ymaps.ready(() => {
            const myMap = new ymaps.Map('map', {
                center: [41.2995, 69.2401],
                zoom: 12,
                controls: ['zoomControl'],
            });

            myMap.behaviors.disable('scrollZoom');
            setMap(myMap);
            fetchWindDirection();
            addColoredPoints(myMap); // Add colored points on map initialization
        });
    };

    // Fetch wind direction data
    const fetchWindDirection = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${OPENWEATHERMAP_API_KEY}`
            );
            const data = await response.json();
            if (data.wind && data.wind.deg) {
                setWindDirection(data.wind.deg);
                moveColoredPoints(data.wind.deg); // Start moving the colored points based on wind direction
            }
        } catch (error) {
            console.error('Failed to fetch wind direction data:', error);
        }
    };

    // Create a custom smoke particle with animated shape
    const createSmokeParticle = (latitude, longitude) => {
        const smokeParticle = new ymaps.Placemark(
            [latitude, longitude],
            { hintContent: 'Toxic fume' },
            {
                iconLayout: 'default#image',
                iconImageHref: createAnimatedSVG(), // Use the custom SVG as an icon
                iconImageSize: [30, 30],
                iconImageOffset: [-15, -15],
            }
        );

        map.geoObjects.add(smokeParticle);
        animateSmokeParticle(smokeParticle);
        return smokeParticle;
    };

    // Function to generate SVG string for an animated colored shape
    const createAnimatedSVG = () => {
        const svg = `
            <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="15" fill="rgba(255, 0, 0, 0.5)">
                    <animate attributeName="r" from="10" to="30" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="30" r="10" fill="rgba(255, 255, 0, 0.5)">
                    <animate attributeName="r" from="5" to="20" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
            </svg>
        `;
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    };

    // Animate smoke particle with movement based on wind direction
    const animateSmokeParticle = (particle) => {
        const speed = 0.0001; // Adjusted speed of movement
        const animate = () => {
            const currentCoordinates = particle.geometry.getCoordinates();

            if (currentCoordinates) {
                // Move in the direction of the wind
                const newCoordinates = [
                    currentCoordinates[0] + (speed * Math.cos(windDirection * Math.PI / 180)),
                    currentCoordinates[1] + (speed * Math.sin(windDirection * Math.PI / 180)),
                ];

                particle.geometry.setCoordinates(newCoordinates);
            }

            // Continue animation
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    // Add colored points to the map
    const addColoredPoints = (myMap) => {
        const points = [
            { coords: [41.2995, 69.2401], color: 'blue', hint: 'Point 1' },
            { coords: [41.362456, 69.294729], color: 'green', hint: 'Point 2' },
            { coords: [41.336479, 69.276565], color: 'orange', hint: 'Point 3' },
            { coords: [41.278203, 69.245112], color: 'purple', hint: 'Point 4' },
            // Additional points with slight variations
            { coords: [41.2995 + 0.01, 69.2401], color: 'blue', hint: 'Point 5' },
            { coords: [41.362456, 69.294729 + 0.01], color: 'green', hint: 'Point 6' },
            { coords: [41.336479 + 0.01, 69.276565], color: 'orange', hint: 'Point 7' },
            { coords: [41.278203, 69.245112 + 0.01], color: 'purple', hint: 'Point 8' },
        ];

        const createdPoints = points.map(point => {
            const placemark = new ymaps.Placemark(
                point.coords,
                { hintContent: point.hint },
                {
                    iconLayout: 'default#circle',
                    iconCircleFillcolor: point.color,
                    iconCircleRadius: 8, // Adjust the size of the point
                }
            );

            myMap.geoObjects.add(placemark);
            return { placemark, coords: point.coords };
        });

        setColoredPoints(createdPoints); // Store the colored points for further manipulation
    };

    // Move colored points based on wind direction
    const moveColoredPoints = (windDirection) => {
        const speed = 0.0001; // Adjusted speed of movement
        const animatePoints = () => {
            coloredPoints.forEach(point => {
                const currentCoords = point.coords;
                // Calculate new coordinates based on wind direction
                const newCoords = [
                    currentCoords[0] + (speed * Math.cos(windDirection * Math.PI / 180)),
                    currentCoords[1] + (speed * Math.sin(windDirection * Math.PI / 180)),
                ];

                // Update the placemark coordinates
                point.placemark.geometry.setCoordinates(newCoords);
                // Update the stored coordinates
                point.coords = newCoords;
            });

            requestAnimationFrame(animatePoints);
        };

        requestAnimationFrame(animatePoints);
    };

    // Handle button click to generate smoke particles
    const handleGenerate = () => {
        if (map) {
            // Clear existing smoke particles
            smokeParticles.forEach(particle => map.geoObjects.remove(particle));
            setSmokeParticles([]);

            // Generate new smoke particles at specified locations
            const newParticles = [
                createSmokeParticle(41.362456, 69.294729),
                createSmokeParticle(41.336479, 69.276565),
                createSmokeParticle(41.278203, 69.245112),
                createSmokeParticle(41.311941, 69.241405),
                createSmokeParticle(41.346802, 69.203026),
                createSmokeParticle(41.3200, 69.2650),
            ];
            setSmokeParticles(newParticles);
        }
    };

    return (
        <div>
            {/* Map container */}
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            {/* Generate button */}
            <button onClick={handleGenerate} className="btnGenerate">
                Generate Smoke Particles
            </button>
        </div>
    );
};

export default MapComponent;
