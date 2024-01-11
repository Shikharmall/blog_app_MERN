import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-03.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCard3({data1}) {

  const [totalUniqueSource,setTotalUniqueSource] = useState(0);

  useEffect(() => {
   // if (Array.isArray(data1)) {
      const uniqueSources = [...new Set(data1.map(item => item.source))];
      setTotalUniqueSource(uniqueSources.length);
    //} else {
    //  console.error('data1 is not an array.');
    //}
  }, [data1]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-md rounded-xl border border-gray-200 dark:border-slate-700">
      <div className="">
        <header className="flex justify-between items-start mb-2 px-6 py-4">
          <div className="bg-gray-200 p-2 m-1 rounded-xl cursor-pointer">
            <svg
              className="w-10 h-10"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z" />
              <path d="M6 7h12v2H6zm0 4h12v2H6zm0 4h6v2H6z" />
            </svg>
          </div>
          <div>
            <div className="text-md text-slate-600 dark:text-slate-500 mb-1">
              Total Sources
            </div>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-100 mb-2 flex items-center">
              {totalUniqueSource}
            </h2>
          </div>
        </header>

        <hr />

        <div className="flex items-start px-6 py-4">
          <div className="text-sm font-semibold text-white px-1.5 bg-red-500 rounded-full">
            -5%
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

export default DashboardCard3;
