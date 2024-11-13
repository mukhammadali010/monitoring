// PollutionCard.js
import React from 'react';
import './Modal';

const PollutionCard = ({ data, position }) => {
    return (
        <div className="pollution-card" style={{ top: position.top, left: position.left }}>
            <h3>Atmosphere Monitoring Station</h3>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Updated:</strong> {data.updatedAt}</p>
            <div className="pollution-details">
                <p><strong>PM 2.5:</strong> {data.pm25} µg/m³</p>
                <p><strong>PM 10:</strong> {data.pm10} µg/m³</p>
                <p><strong>CO:</strong> {data.co} mg/m³</p>
                <p><strong>NO₂:</strong> {data.no2} mg/m³</p>
                <p><strong>O₃:</strong> {data.o3} mg/m³</p>
            </div>
        </div>
    );
};

export default PollutionCard;
