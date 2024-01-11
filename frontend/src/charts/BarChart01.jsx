import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { BarController, BarElement, LinearScale, Tooltip, Legend } from "chart.js";
import { CategoryScale } from 'chart.js';

// Import utilities
import { tailwindConfig } from "../utils/Utils";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function BarChart01({ data1, width, height }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Extract unique publication dates
      const uniquePublicationDates = [...new Set(data1.map((item) => item.published))];

      // Create an object to store intensities for each publication date
      const intensitiesByDate = {};

      // Initialize intensitiesByDate with zeros
      uniquePublicationDates.forEach(date => {
        intensitiesByDate[date] = 0;
      });

      // Accumulate intensities for each publication date
      data1.forEach((item) => {
        intensitiesByDate[item.published] += item.intensity;
      });

      const newChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: uniquePublicationDates,
          datasets: [
            {
              label: "Total Intensity",
              data: uniquePublicationDates.map(date => intensitiesByDate[date]),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
       /* data: {
          labels: uniquePublicationDates.map(date => date.split(" ")[0]), // Extract only the date part
          datasets: [
            {
              label: "Total Intensity",
              data: uniquePublicationDates.map(date => intensitiesByDate[date]),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },*/
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChart);
    }
  }, [data1]);

  return (
    <div className="p-4">
      <canvas ref={chartRef} ></canvas>
    </div>
  );
}

export default BarChart01;
