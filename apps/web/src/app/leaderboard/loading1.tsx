import {
  faArrowLeft,
  faArrowRight,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  // Generate dummy shimmer blocks
  const shimmerBlocks = Array.from({ length: 10 }).map((_, index) => (
    <tr key={index} className="odd:bg-neutral-900  animate-pulse ">
      <td className="px-4 py-3 text-center align-middle">
        <div className="w-[50%]  h-2 bg-gray-400  mx-auto"></div>
      </td>
      <td className="px-4 py-3 text-center align-middle">
        <div className="w-[50%] h-2 bg-gray-400 mx-auto"></div>
      </td>
      <td className="px-4 py-3 text-center align-middle">
        <div className="w-[50%] h-2 bg-gray-400 mx-auto"></div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="flex justify-center items-center mt-8 gap-4 ">
        <h1 className="font-bold text-2xl ">
          Leaderboard <FontAwesomeIcon icon={faTrophy} color="gold" />
        </h1>
      </div>
      <div className="flex flex-col m-4 rounded-md overflow-hidden">
        <table className="table-fixed overflow-y-scroll lg:table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase ">
              <th className="px-4 py-3">Rankings</th>
              <th className="px-4 py-3">Name</th>
              <th className="hidden sm:table-cell px-4 py-3 ">
                Accepted Submissions
              </th>
            </tr>
          </thead>
          <tbody>{shimmerBlocks}</tbody>
        </table>
        <div className="flex items-center justify-center my-5">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2 text-sm"
            color="gray"
          />
          <span className="mx-4">Page 1 of 1</span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="ml-2 text-sm"
            color="gray"
          />
        </div>
      </div>
    </>
  );
};
export default Loading;
