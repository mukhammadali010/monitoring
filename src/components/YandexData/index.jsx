import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const YANDEX_MAPS_API_KEY = '78eb91a1-8baf-4f28-be21-30ad54e78407';
const token = localStorage.getItem('access_token');
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
    { name: 'Yashnaobod', coordinates: [41.2832, 69.3339] },
    { name: 'Mirobod', coordinates: [41.2774, 69.2972] },
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
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Add this header
                },
                body: JSON.stringify(requestData), // Ensure this is properly serialized
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


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleFetchData = async () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates!");
            return;
        }

        const startTimestamp = Math.floor(startDate.toDate().getTime() / 1000);
        const endTimestamp = Math.floor(endDate.toDate().getTime() / 1000);

        try {
            const dataPoints = await Promise.all(
                TASHKENT_REGIONS.map(async (region) => {
                    const response = await fetch("https://back.ecomonitoring.uz/monitoring/v1/history/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            latitude: region.coordinates[0],
                            longitude: region.coordinates[1],
                            start: startTimestamp,
                            end: endTimestamp,
                        }),
                    });

                    if (!response.ok) throw new Error("Failed to fetch data.");

                    const data = await response.json();
                    return { region, pollution: data.list[data.list.length - 1]?.components.pm2_5 || 0 };
                })
            );

            setPollutedPoints(dataPoints);
            map.geoObjects.removeAll();
            dataPoints.forEach((point) => {
                const { region, pollution } = point;

                const placemark = new ymaps.Placemark(
                    region.coordinates,
                    {
                        hintContent: `${region.name}: ${pollution} µg/m³`,
                        balloonContent: `
                            <strong>Region:</strong> ${region.name}<br/>
                            <strong>PM2.5:</strong> ${pollution} µg/m³`,
                    },
                    { preset: "islands#blueCircleDotIcon" }
                );

                map.geoObjects.add(placemark);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };




    return (
        <div>
            <div id="map" style={{ width: '100%', height: '500px'}}></div>
            <div style={{ marginTop: '20px', border:'1px solid red' , display: 'flex', alignItems:'center', justifyContent:'center' , gap: '10px' }}>
                <button onClick={handleShowMyLocation} className='btnGenerate'>Show My Location</button>
                <button onClick={getPollutionData} className='btnGenerate'>Current Pollution Level</button>
                <div style={{display:'flex' , gap:'40px',  alignItems:'end' , justifyContent:'center'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <button
                    className='btnGenerate'
                      
                        onClick={handleFetchData}
                    >
                        Historilcal Pollution Level
                    </button>
                </div>

            </div>

            <div style={{ marginTop: '20px', width: '100%', height: '400px' }}>
                <h3>Pollution Levels for 2024</h3>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

// const buttonStyle = {
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
// };

export default MapComponent;
