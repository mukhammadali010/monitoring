import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YANDEX_MAPS_API_KEY = '78eb91a1-8baf-4f28-be21-30ad54e78407'; 

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [pollutedPoints, setPollutedPoints] = useState([]);
    const [chartData, setChartData] = useState({
        year2022: { labels: [], datasets: [] },
        year2023: { labels: [], datasets: [] },
        year2024: { labels: [], datasets: [] },
    });
    const [userLocation, setUserLocation] = useState(null);

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

    const getRandomPollutionLevels = (baseLevel) =>
        Array.from({ length: 12 }, () => baseLevel + Math.floor(Math.random() * 20 - 10));

    const handleGenerate = () => {
        if (map) {
            pollutedPoints.forEach(point => map.geoObjects.remove(point));
            setPollutedPoints([]);

            const points = [];
            let count = 0;
            const interval = setInterval(() => {
                if (count < 15) {
                    const [lat, lon] = getRandomCoordinates();
                    const pollutionLevel = Math.floor(Math.random() * 100) + 50;

                    const point = new ymaps.Placemark(
                        [lat, lon],
                        {
                            hintContent: `Pollution Level: ${pollutionLevel} µg/m³`,
                            balloonContent: `<strong>Location:</strong> (${lat.toFixed(4)}, ${lon.toFixed(4)})<br/><strong>Pollution:</strong> ${pollutionLevel} µg/m³`,
                        },
                        { preset: 'islands#redDotIcon' }
                    );

                    map.geoObjects.add(point);
                    points.push(point);
                    setPollutedPoints(prev => [...prev, point]);
                    count++;
                } else {
                    clearInterval(interval);
                    updateChartData();
                }
            }, 500);
        }
    };

    const updateChartData = () => {
        const data2022 = getRandomPollutionLevels(50);
        const data2023 = getRandomPollutionLevels(55);
        const data2024 = getRandomPollutionLevels(60);

        setChartData({
            year2022: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'PM2.5 Levels (µg/m³) in 2022',
                        data: data2022,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    },
                ],
            },
            year2023: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'PM2.5 Levels (µg/m³) in 2023',
                        data: data2023,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    },
                ],
            },
            year2024: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'PM2.5 Levels (µg/m³) in 2024',
                        data: data2024,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    },
                ],
            },
        });
    };

    const getLocation = () => {
        if (!map) {
            alert('Map is not ready yet. Please try again later.');
            return;
        }
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
    
                    // Create a marker for the user's location
                    const userMarker = new ymaps.Placemark(
                        [latitude, longitude],
                        { hintContent: 'Your Location', balloonContent: 'You are here!' },
                        { preset: 'islands#blueDotIcon' }
                    );
    
                    map.geoObjects.add(userMarker);
                    map.setCenter([latitude, longitude], 13);
                },
                error => {
                    console.error('Error getting location:', error);
    
                    let errorMessage = 'Unable to retrieve your location.';
                    if (error.code === error.PERMISSION_DENIED) {
                        errorMessage = 'Location access was denied. Please allow location access and try again.';
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        errorMessage = 'Location information is unavailable. Check your GPS or network settings.';
                    } else if (error.code === error.TIMEOUT) {
                        errorMessage = 'Location request timed out. Please try again.';
                    }
                    alert(errorMessage);
                },
                {
                    enableHighAccuracy: true, 
                    timeout: 10000, 
                    maximumAge: 0, 
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            alert('Geolocation is not supported by your browser.');
        }
    };

    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100,
                title: { display: true, text: 'PM2.5 Levels (µg/m³)' },
            },
        },
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            <div style={{ marginTop: '20px', marginLeft:'40px' , display: 'flex', gap: '10px' }}>
                <button onClick={handleGenerate} style={buttonStyle}>
                    Generate
                </button>
                <button onClick={getLocation} style={buttonStyle}>
                    Show My Location
                </button>
            </div>

            <div className="chart-container">
                <div className="chart">
                    <h4>Air Pollution in Tashkent - 2022</h4>
                    <Line data={chartData.year2022} options={chartOptions} />
                </div>
                <div className="chart">
                    <h4>Air Pollution in Tashkent - 2023</h4>
                    <Line data={chartData.year2023} options={chartOptions} />
                </div>
                <div className="chart">
                    <h4>Air Pollution in Tashkent - 2024</h4>
                    <Line data={chartData.year2024} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default MapComponent;
