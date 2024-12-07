import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

export default function HistoricalDataFetcher({ map }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFetchData = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates!");
      return;
    }

    const startTimestamp = Math.floor(startDate.toDate().getTime() / 1000); // Convert to UNIX timestamp
    const endTimestamp = Math.floor(endDate.toDate().getTime() / 1000);
console.log(startTimestamp , 'test');
console.log(endTimestamp , 'test2');

    const requestData = {
      latitude: 41.3664, // Example latitude
      longitude: 69.2806, // Example longitude
      start: startTimestamp,
      end: endTimestamp,
    };

    try {
      const response = await fetch("https://back.ecomonitoring.uz/monitoring/v1/history/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept-Language': 'uz' ,
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNTU5MDY2LCJpYXQiOjE3MzM0NzI2NjYsImp0aSI6ImM5YmY2ODdmYjYxOTQ0OGJhZjM1NWFlZjU5MTk1MWVmIiwidXNlcl9pZCI6Mn0.Ez022zp-pqx8woMv_RrjamokBox5ywcFi3Rva0ekc78", 
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();
      console.log("Historical Data:", data);

      // Clear existing markers
      map.geoObjects.removeAll();

      // Add markers for the fetched data
      data.list.forEach((record) => {
        const placemark = new ymaps.Placemark(
          [requestData.latitude, requestData.longitude],
          {
            hintContent: `AQI: ${record.main.aqi}`,
            balloonContent: `
              <strong>Date:</strong> ${dayjs(record.dt * 1000).format("YYYY-MM-DD")}<br/>
              <strong>CO:</strong> ${record.components.co} µg/m³<br/>
              <strong>NO2:</strong> ${record.components.no2} µg/m³<br/>
              <strong>PM2.5:</strong> ${record.components.pm2_5} µg/m³`,
          },
          { preset: "islands#blueDotIcon" }
        );
        map.geoObjects.add(placemark);
      });
    } catch (error) {
      console.error("Error fetching historical data:", error);
      alert("Failed to fetch data. Please check your input or try again later.");
    }
  };

  return (
    <div>
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
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={handleFetchData}
      >
        Get Historical Data
      </Button>
    </div>
  );
}
