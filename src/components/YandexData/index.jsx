import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YANDEX_MAPS_API_KEY = '78eb91a1-8baf-4f28-be21-30ad54e78407';

const TASHKENT_REGIONS = [
    { name: 'Yunusabad', coordinates: [41.3664, 69.2806] },
    { name: 'Mirzo Ulugbek', coordinates: [41.3383, 69.3345] },
    { name: 'Chilanzar', coordinates: [41.2723, 69.2044] },
    { name: 'Shaykhontohur', coordinates: [41.3201, 69.2334] },
    { name: 'Yakkasaray', coordinates: [41.2851, 69.2601] },
    { name: 'Uchtepa', coordinates: [41.2852, 69.1777] },
    { name: 'Olmazor', coordinates: [41.2987, 69.2163] },
    { name: 'Bektemir', coordinates: [41.2422, 69.3432] },
    { name: 'Sergeli', coordinates: [41.2414, 69.2376] },
];

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [pollutedPoints, setPollutedPoints] = useState([]);
    const [chartData, setChartData] = useState({
        labels: TASHKENT_REGIONS.map((region) => region.name),
        datasets: [
            {
                label: 'Pollution Levels (2022)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Pollution Levels (2023)',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Pollution Levels (2024)',
                data: [],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    });

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

    const handleGenerate = () => {
        if (map) {
            // Clear existing points
            pollutedPoints.forEach((point) => map.geoObjects.remove(point));
            setPollutedPoints([]);
    
            const points = [];
            const pollutionLevelsPM25 = []; // Array to store PM2.5 levels
    
            // Fetch pollution data for each region
            const fetchPromises = TASHKENT_REGIONS.map((region) => {
                const requestData = {
                    latitude: region.coordinates[0],
                    longitude: region.coordinates[1],
                };
    
                return fetch('https://back.ecomonitoring.uz/monitoring/v1/current/', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNTczNTExLCJpYXQiOjE3MzM0ODcxMTEsImp0aSI6IjIwZDA4NGQ5ZGRmMjQ1ZTc5OTZmMmZmYzgwNDkzNmRiIiwidXNlcl9pZCI6M30.KsW_mE6sfijmRTVQXxrgN6tWikABGHnWCQn_p_ohdSE', // Replace with your actual token
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch data for ${region.name}: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log(`${region.name} Pollution Data:`, data);
    
                        // Extract PM2.5 data
                        const pm25 = data.list[0]?.components?.pm2_5 || 0;
    
                        // Add a placemark for the region
                        const placemark = new ymaps.Placemark(
                            region.coordinates,
                            {
                                hintContent: `${region.name}: PM2.5 - ${pm25} µg/m³`,
                                balloonContent: `
                                    <strong>Region:</strong> ${region.name}<br/>
                                    <strong>Pollution:</strong><br/>
                                    PM2.5: ${pm25} µg/m³`,
                            },
                            { preset: 'islands#redDotIcon' }
                        );
                        map.geoObjects.add(placemark);
                        points.push(placemark);
    
                        // Store PM2.5 levels for the chart
                        pollutionLevelsPM25.push(pm25);
                    })
                    .catch((error) => {
                        console.error(`Error fetching data for ${region.name}:`, error);
                    });
            });
    
            // Wait for all fetch requests to complete
            Promise.all(fetchPromises)
                .then(() => {
                    setPollutedPoints(points); // Update points on the map
                    setChartData({
                        labels: TASHKENT_REGIONS.map((region) => region.name),
                        datasets: [
                            {
                                label: 'PM2.5 Pollution',
                                data: pollutionLevelsPM25,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: true,
                            },
                        ],
                    });
                });
        }
    };
    
    const handleShowMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userCoordinates = [position.coords.latitude, position.coords.longitude];
                    const userLocationMarker = new ymaps.Placemark(
                        userCoordinates,
                        {
                            hintContent: 'Your Location',
                            balloonContent: `<strong>Your Location:</strong><br/>Lat: ${position.coords.latitude}<br/>Lon: ${position.coords.longitude}`,
                        },
                        { preset: 'islands#blueDotIcon' }
                    );

                    map.geoObjects.add(userLocationMarker);
                    map.setCenter(userCoordinates, 14, { checkZoomRange: true });
                },
                (error) => {
                    alert('Error retrieving your location');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            title: { display: true, text: 'Pollution Levels in Tashkent Regions Over the Years' },
        },
        scales: {
            x: { title: { display: true, text: 'Regions' } },
            y: { min: 0, max: 150, title: { display: true, text: 'Pollution Levels (µg/m³)' } },
        },
    };

    const getPollutionData = () => {
        const pollutionLevels2024 = [];
        const pollutionLevelsPM25 = []; // For PM2.5 levels
    
        // Clear existing markers
        pollutedPoints.forEach((point) => map.geoObjects.remove(point));
        setPollutedPoints([]);
    
        // Request data for each region
        const regionPromises = TASHKENT_REGIONS.map((region) => {
            const requestData = {
                latitude: region.coordinates[0],
                longitude: region.coordinates[1],
            };
    
            return fetch('https://back.ecomonitoring.uz/monitoring/v1/current/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNTU5MDY2LCJpYXQiOjE3MzM0NzI2NjYsImp0aSI6ImM5YmY2ODdmYjYxOTQ0OGJhZjM1NWFlZjU5MTk1MWVmIiwidXNlcl9pZCI6Mn0.Ez022zp-pqx8woMv_RrjamokBox5ywcFi3Rva0ekc78',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data for ${region.name}: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(`${region.name} Pollution Data:`, data);
    
                    // Extract pollution data (adjust based on API response)
                    const pollutionLevels = data.list[0].components;
    
                    pollutionLevels2024.push(pollutionLevels.o3 || 0);
                    pollutionLevelsPM25.push(pollutionLevels.pm2_5 || 0);
    
                    // Add a placemark for the region
                    const placemark = new ymaps.Placemark(
                        region.coordinates,
                        {
                            hintContent: `${region.name}: ${pollutionLevels.pm2_5} µg/m³ (PM2.5)`,
                            balloonContent: `
                                <strong>Region:</strong> ${region.name}<br/>
                                <strong>Pollution:</strong><br/>
                                CO: ${pollutionLevels.co} µg/m³<br/>
                                NO2: ${pollutionLevels.no2} µg/m³<br/>
                                O3: ${pollutionLevels.o3} µg/m³<br/>
                                PM2.5: ${pollutionLevels.pm2_5} µg/m³`,
                        },
                        { preset: 'islands#redDotIcon' }
                    );
                    map.geoObjects.add(placemark);
                    return placemark;
                })
                .catch((error) => {
                    console.error(`Error fetching data for ${region.name}:`, error);
                });
        });
    
        // Once all the requests are complete
        Promise.all(regionPromises)
            .then((points) => {
                setPollutedPoints(points); // Update markers
    
                // Update chart data with the fetched pollution levels
                setChartData({
                    labels: TASHKENT_REGIONS.map((region) => region.name),
                    datasets: [
                        {
                            label: 'O3 Pollution (2024)',
                            data: pollutionLevels2024,
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'PM2.5 Pollution',
                            data: pollutionLevelsPM25,
                            borderColor: 'rgba(255, 206, 86, 1)',
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            fill: true,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error('Error updating chart and map:', error);
            });
    };
    
    

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '500px' }}></div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={handleGenerate} style={buttonStyle}>Generate</button>
                <button onClick={handleShowMyLocation} style={buttonStyle}>Show My Location</button>
                {/* <button onClick={getPollutionData} style={buttonStyle}>Current Pollution Data</button> */}

            </div>
            
            <div style={{ marginTop: '20px', width: '100%', height: '400px' }}>
                <h3>Pollution Levels for 2024</h3>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default MapComponent;
