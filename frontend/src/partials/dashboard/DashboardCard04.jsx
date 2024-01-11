import React from "react";
import BarChart from "../../charts/BarChart01";
import Tooltip from "../../components/Tooltip";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";


function DashboardCard04({data1}) {
  /*const chartData = {
    labels: [
      "12-01-2020",
      "01-01-2021",
      "02-01-2021",
      "03-01-2021",
      "04-01-2021",
      "05-01-2021",
    ],
    datasets: [
      // Light blue bars
      {
        label: "Direct",
        data: [800, 1600, 900, 1300, 1950, 1700],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: "Indirect",
        data: [4900, 2600, 5350, 4800, 5200, 4800],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };*/

  return (
    <div className="flex flex-col col-span-full sm:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">

      <header className="p-6 pb-0 dark:border-slate-700 ">
        <div className="flex items-center">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Articles Analysis
          </h2>
          <Tooltip className="ml-2">
            <div className="text-xs text-center whitespace-nowrap">
              Total articles intensity per day.{" "}
            </div>
          </Tooltip>
        </div>
      </header>

      <div className="flex items-start px-6 py-4">
          <div className="text-sm font-semibold text-white px-1.5 bg-red-500 rounded-full">
            -9%
          </div>
          &nbsp;
          <div className="text-md text-slate-500 dark:text-slate-100 mr-2">
            than last week
          </div>
        </div>

        <BarChart data1={data1} width={595} height={248} />

      <hr />

      <div className="p-6 flex items-center">
        <svg
          className="w-4 h-4 text-slate-400"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
          fill="currentColor"
            d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M9.06976744,5.58139535 C8.6844525,5.58139535 8.37209302,5.89375483 8.37209302,6.27906977 L8.37209302,6.27906977 L8.37209302,11.8604651 C8.37209302,12.2457801 8.6844525,12.5581395 9.06976744,12.5581395 L9.06976744,12.5581395 L14.6511628,12.5581395 C15.0364777,12.5581395 15.3488372,12.2457801 15.3488372,11.8604651 C15.3488372,11.4751502 15.0364777,11.1627907 14.6511628,11.1627907 L14.6511628,11.1627907 L9.76744186,11.1627907 L9.76744186,6.27906977 C9.76744186,5.89375483 9.45508238,5.58139535 9.06976744,5.58139535 Z"
          />
        </svg>
        &nbsp;
        <p className="text-slate-600 dark:text-slate-100">
          updated 2 days ago
        </p>
      </div>
    </div>
  );
}

export default DashboardCard04;
