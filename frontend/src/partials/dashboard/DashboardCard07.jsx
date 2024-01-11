import React from "react";

function DashboardCard07({ data1 }) {
  const sortedData = data1.sort((a, b) => b.intensity - a.intensity);

  // Take the top 6 items
  const top6Data = sortedData.slice(0, 6);
  console.log(top6Data);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Top Articles
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Source</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Topic</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Title</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Published</div>
                </th>
                {/*<th className="p-2">
                  <div className="font-semibold text-center">Conversion</div>
                </th>*/}
              </tr>
            </thead>
            {/* Table body */}

            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {top6Data && top6Data.length > 0 ? (
                <>
                  {top6Data.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <div className="flex items-center p-2">
                          <a
                            href={item.url}
                            className="flex items-center"
                            target="_blank"
                          >
                            <svg
                              className="shrink-0 mr-1 sm:mr-2"
                              width="23"
                              height="23"
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="48"
                                height="48"
                                fill="white"
                                fill-opacity="0.01"
                              />
                              <path
                                d="M24.7071 9.56496L9.85789 24.4142C6.34317 27.9289 6.34317 33.6274 9.85789 37.1421V37.1421C13.3726 40.6568 19.0711 40.6568 22.5858 37.1421L40.2635 19.4645C42.6066 17.1213 42.6066 13.3223 40.2635 10.9792V10.9792C37.9203 8.63603 34.1213 8.63603 31.7782 10.9792L14.1005 28.6568C12.929 29.8284 12.929 31.7279 14.1005 32.8995V32.8995C15.2721 34.0711 17.1716 34.0711 18.3432 32.8995L33.1924 18.0502"
                                stroke="#000000"
                                stroke-width="4"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <div className="text-slate-800 dark:text-slate-100">
                              {item.source}
                            </div>
                          </a>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-emerald-500 uppercase">
                          {item.topic}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">
                          {item.title?.substring(0, 30)}....
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-sky-500">
                          {item.published?.substring(
                            0,
                            item.published.indexOf(" 00:00:00")
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
