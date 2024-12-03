import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CustomTooltipChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Dataset 2',
        data: [45, 49, 60, 71, 66, 75, 85],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
    ],
  };

  // Options for the chart with a custom tooltip
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false, // To allow tooltips on hover
        callbacks: {
          // Custom tooltip title
          title: (tooltipItem) => {
            return `Custom Title: ${tooltipItem[0].label}`;
          },
          // Custom tooltip label
          label: (tooltipItem) => {
            return `Custom Label: ${tooltipItem.raw}`;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest', // Tooltip will appear for nearest point
      intersect: false,
    },
  };

  return (
    <div>
      <h2>Custom Tooltip Chart Example</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomTooltipChart;
