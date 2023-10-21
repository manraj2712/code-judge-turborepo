import React from 'react'
const columns = [
    { id: "status", label: "Status" },
    { id: "acceptance", label: "Acceptance" },
    { id: "title", label: "Title" },
    { id: "difficulty", label: "Difficulty" },
  ];
const fakeData = Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    title: "Loading...",
    status: "Loading...",
    difficulty: "Loading...",
  }));
const loading = () => {
  return (
    <div className="flex flex-row w-full h-full">
        <div className="flex flex-col sm:block w-80 xl:w-56 p-3 bg-neutral-900 shadow duration-300 overflow-y-auto">
        <table>
        <tbody>
                {fakeData.map((i) => (
                  <tr
                    key={i.id}
                    className="odd:bg-neutral-900 text-gray-200"
                  >
                    <td className="hidden lg:table-cell px-6 py-4 text-base">
                      {i.status} 
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        <div className="flex flex-col w-full px-3">
    <div className="">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="overflow-x-hidden">
      
      <table className="table-fixed overflow-y-scroll lg:table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.id}
                      className={`lg:px-6 py-3 ${
                        index === columns.length - 1
                          ? "text-center"
                          : "text-left"
                      } ${
                        ["acceptance", "status"].includes(column.id)
                          ? "hidden lg:table-cell"
                          : ""
                      } ${
                        column.id == "title" ? "w-[70%]" : "w-auto"
                      } text-base font-medium text-gray-500 dark:text-gray-200`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fakeData.map((i) => (
                  <tr
                    key={i.id}
                    className="odd:bg-neutral-900 text-gray-200"
                  >
                    <td className="hidden lg:table-cell px-6 py-4 text-base">
                      {i.status} 
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 text-left text-base">
                      {i.difficulty}
                    </td>

                    <td className="w-[70%] lg:w-auto hide-multi-line px-2 lg:px-6 py-4 hover:cursor-pointer hover:text-blue-700 text-base">
                        {i.title}
                    </td>
                    <td
                      className='px-6 py-4 text-center text-base '>
                      {i.difficulty}
                    </td>
                  </tr>
                ))}
              </tbody>
      </table>
      </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default loading