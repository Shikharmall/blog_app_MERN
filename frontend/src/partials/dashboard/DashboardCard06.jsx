import React, { useEffect, useState } from "react";
import DoughnutChart from "../../charts/DoughnutChart";
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard06({ data1 }) {
  const [industriesData, setIndustriesData] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [economicData, setEconomicData] = useState([]);
  const [politicalData, setPoliticalData] = useState([]);
  const [socialData, setSocialData] = useState([]);
  const [technologicalData, setTechnologicalData] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [healthcareData, setHealthcareData] = useState([]);
  const [lifestylesData, setLifestylesData] = useState([]);

  useEffect(() => {
    const industriesData = data1.filter((item) => item.pestle === "Industries");
    const environmentalData = data1.filter(
      (item) => item.pestle === "Environmental"
    );
    const economicData = data1.filter((item) => item.pestle === "Economic");
    const politicalData = data1.filter((item) => item.pestle === "Political");
    const technologicalData = data1.filter(
      (item) => item.pestle === "Technological"
    );
    const organizationData = data1.filter(
      (item) => item.pestle === "Organization"
    );
    const healthcareData = data1.filter((item) => item.pestle === "Healthcare");
    const socialData = data1.filter((item) => item.pestle === "Social");
    const lifestylesData = data1.filter((item) => item.pestle === "Lifestyles");

    setIndustriesData(industriesData);
    setEnvironmentalData(environmentalData);
    setEconomicData(economicData);
    setPoliticalData(politicalData);
    setSocialData(socialData);
    setTechnologicalData(technologicalData);
    setOrganizationData(organizationData);
    setHealthcareData(healthcareData);
    setLifestylesData(lifestylesData);
  }, [data1]);

  const [chartData, setChartData] = useState({
  labels: [
    "Industries",
    "Environmental",
    "Economic",
    "Political",
    "Technological",
    "Organization",
    "Healthcare",
    "Social",
    "Lifestyles",
  ],
  datasets: [
    {
      label: "Total Articles ",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0], // Initial static data
      backgroundColor: [
        '#FF5733', // Custom color for "Industries"
        '#33FF57', // Custom color for "Environmental"
        '#5733FF', // Custom color for "Economic"
        '#FF33B4', // Custom color for "Political"
        '#33B4FF', // Custom color for "Technological"
        '#B4FF33', // Custom color for "Organization"
        '#FFB433', // Custom color for "Healthcare"
        '#B433FF', // Custom color for "Social"
        '#FF338C', // Custom color for "Lifestyles"
      ],
      hoverBackgroundColor: [
        '#FF7755',
        '#55FF77',
        '#7755FF',
        '#FF55D8',
        '#55D8FF',
        '#D8FF55',
        '#FFD855',
        '#D855FF',
        '#FF559C',
      ],
      borderWidth: 0,
    },
  ],
});


  useEffect(() => {
    setChartData((prevChartData) => {
      const newData = [
        industriesData.length,
        environmentalData.length,
        economicData.length,
        politicalData.length,
        technologicalData.length,
        organizationData.length,
        healthcareData.length,
        socialData.length,
        lifestylesData.length,
      ];

      // Using functional update to avoid race conditions
      return {
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: newData,
          },
        ],
      };
    });
  }, [
    industriesData.length,
    environmentalData.length,
    economicData.length,
    politicalData.length,
    technologicalData.length,
    organizationData.length,
    healthcareData.length,
    socialData.length,
    lifestylesData.length,
  ]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
        Pestle Analysis
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
