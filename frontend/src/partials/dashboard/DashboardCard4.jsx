import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
//import LineChart from "../../charts/LineChart01";
//import Icon from "../../images/icon-03.svg";
//import EditMenu from "../../components/DropdownEditMenu";
//
//// Import utilities
//import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCard4({ data1 }) {
  const [totalUniqueSectors, setTotalUniqueSectors] = useState(0);

  useEffect(() => {
    const uniqueSectors = [...new Set(data1.map((item) => item.sector))];
    setTotalUniqueSectors(uniqueSectors.length);
  }, [data1]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-md rounded-xl border border-gray-200 dark:border-slate-700">
      <div className="">
        <header className="flex justify-between items-start mb-2 px-6 py-4">
          <div className="bg-gray-200 p-2 m-1 rounded-xl cursor-pointer">
            <svg
              className="w-10 h-10"
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>report-barchart</title>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="add"
                  fill="#000000"
                  transform="translate(42.666667, 85.333333)"
                >
                  <path
                    d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666,234.666 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z M170.666667,149.333333 L170.666667,213.333333 L128,213.333333 L128,149.333333 L170.666667,149.333333 Z M234.666667,106.666667 L234.666667,213.333333 L192,213.333333 L192,106.666667 L234.666667,106.666667 Z M298.666667,170.666667 L298.666667,213.333333 L256,213.333333 L256,170.666667 L298.666667,170.666667 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div>
            <div className="text-md text-slate-600 dark:text-slate-500 mb-1">
              Total Sectors
            </div>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-100 mb-2">
              {totalUniqueSectors}
            </h2>
          </div>
        </header>

        <hr />

        <div className="flex items-start px-6 py-4">
          <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">
            +19%
          </div>
          &nbsp;
          <div className="text-md text-slate-500 dark:text-slate-100 mr-2">
            than last week
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard4;
