import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCard1({ data1 }) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-md rounded-xl border border-gray-200 dark:border-slate-700">
      <div className="">
        <header className="flex justify-between items-start mb-2 px-6 py-4">
          <div className="bg-gray-200 p-2 m-1 rounded-xl cursor-pointer">
            <svg
              className="w-10 h-10"
              viewBox="-5.5 0 61.432 61.432"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Group_56"
                data-name="Group 56"
                transform="translate(-447.948 -926.141)"
              >
                <path
                  id="Path_42"
                  data-name="Path 42"
                  d="M497.139,938.044h-5.417v-5a1.25,1.25,0,0,0-1.25-1.25h-4.746v-4.4a1.25,1.25,0,0,0-1.25-1.25H449.2a1.249,1.249,0,0,0-1.25,1.25v47.028a1.25,1.25,0,0,0,1.25,1.25h4.747v4.4a1.25,1.25,0,0,0,1.25,1.25h5.416v5a1.25,1.25,0,0,0,1.25,1.25h35.278a1.25,1.25,0,0,0,1.25-1.25V939.294A1.25,1.25,0,0,0,497.139,938.044Zm-46.691,35.125V928.641h32.778v3.15H455.2a1.25,1.25,0,0,0-1.25,1.25v40.128Zm6,5.651V934.291h32.777v3.753H461.861a1.25,1.25,0,0,0-1.25,1.25V978.82Zm39.444,6.253H463.111V940.544h32.778Z"
                  fill="#0c2b67"
                />
                <path
                  id="Path_43"
                  data-name="Path 43"
                  d="M466.993,968.634a1.25,1.25,0,0,0,0,2.5h25.014a1.25,1.25,0,0,0,0-2.5Z"
                  fill="#0c2b67"
                />
                <path
                  id="Path_44"
                  data-name="Path 44"
                  d="M492.007,973.444H466.993a1.25,1.25,0,0,0,0,2.5h25.014a1.25,1.25,0,0,0,0-2.5Z"
                  fill="#0c2b67"
                />
                <path
                  id="Path_45"
                  data-name="Path 45"
                  d="M492.007,978.256H466.993a1.25,1.25,0,0,0,0,2.5h25.014a1.25,1.25,0,0,0,0-2.5Z"
                  fill="#0c2b67"
                />
                <rect
                  id="Rectangle_34"
                  data-name="Rectangle 34"
                  width="25.015"
                  height="20.976"
                  transform="translate(466.993 943.975)"
                  fill="#0c2b67"
                />
              </g>
            </svg>
          </div>
          <div>
            <div className="text-md text-slate-600 dark:text-slate-500 mb-1">
              Total Artices
            </div>
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-100 mb-2">
              {data1.length}
            </h2>
          </div>
        </header>

        <hr />

        <div className="flex items-start px-6 py-4">
          <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">
            +49%
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

export default DashboardCard1;
