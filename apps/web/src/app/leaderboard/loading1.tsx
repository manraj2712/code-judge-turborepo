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
      <td className="text-ms font-semibold py-3  border-r">
        <div className="w-[50%] rounded-md  h-2 bg-gray-400  mx-auto"></div>
      </td>
      <td className="text-ms  font-semibold py-3  border-r">
        <div className="w-[50%] rounded-md h-2 bg-gray-400 mx-auto"></div>
      </td>
      <td className="text-ms font-semibold py-3 ">
        <div className="w-[50%] rounded-md h-2 bg-gray-400 mx-auto"></div>
      </td>
    </tr>
  ));
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className=" flex flex-row my-8 justify-center items-center ">
        <h1 className="text-2xl font-semibold text-center">Leaderboard</h1>
        <FontAwesomeIcon
          icon={faTrophy}
          className="ml-3"
          size="lg"
          color="gold"
        />
      </div>
      <div className="flex  w-[80%] overflow-hidden rounded-md ">
        <table className="table-fixed overflow-y-scroll lg:table-fixed divide-y w-full divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase ">
              <th className=" w-8 sm:w-12 px-3 py-3 truncate ">Rankings</th>
              <th className="px-3 py-3 w-20 truncate ">Name</th>
              <th className="w-8 sm:w-12 px-3 py-3 truncate ">
                Solved Problems
              </th>
            </tr>
          </thead>
          <tbody>{shimmerBlocks}</tbody>
        </table>
      </div>
      <div className="flex items-center mt-16 mb-8 justify-center">
        <FontAwesomeIcon
          //left arrow
          icon={faArrowLeft}
          className="mr-2 "
          size="sm"
          color={"dark grey"}
        />
        <span className=" mx-4 text-center ">Page 1 of 1</span>
        <FontAwesomeIcon
          //right arrow
          icon={faArrowRight}
          className="ml-2"
          color="dark grey"
          size="sm"
        />
      </div>
    </div>
  );
};
export default Loading;
