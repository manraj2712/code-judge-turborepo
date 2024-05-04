"use client";
import {
  faArrowLeft,
  faArrowRight,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react";
import Loading from "@/app/leaderboard/loading1";
const Leaderboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const offset = 10; // Number of users to show per page

  const fetchUsers = async () => {
    try {
      const url = "/api/leaderboard";
      const res = await axios.get(url, {
        params: {
          page: currentPage,
          offset,
        },
      });
      // await new Promise((resolve) => setTimeout(resolve, 1000000000000));

      const usersWithSubmissions = res.data.users;
      const sortedUsers = usersWithSubmissions.sort((a: User, b: User) =>
        a.name.localeCompare(b.name)
      );
      const totalUsersCount = res.data.userCount; // Get total count from response headers

      setTotalPages(Math.ceil(totalUsersCount / offset)); // Calculate total pages based on total count
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-1 flex-col items-center">
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
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="odd:bg-neutral-900 even:bg-neutral-700 text-center items-center  justify-center  text-gray-200"
              >
                <td className="text-ms font-semibold py-3 px-2 border-r">
                  <FontAwesomeIcon
                    icon={faTrophy}
                    className={`text-sm ${
                      (currentPage - 1) * offset + index + 1 < 4
                        ? "visible"
                        : "hidden"
                    }`}
                    color={
                      (currentPage - 1) * offset + index + 1 === 1
                        ? "gold"
                        : (currentPage - 1) * offset + index + 1 === 2
                          ? "silver"
                          : (currentPage - 1) * offset + index + 1 === 3
                            ? "orange"
                            : undefined
                    }
                  />
                  <span className="mx-1">
                    {(currentPage - 1) * offset + index + 1}
                  </span>
                </td>
                <td className="text-ms font-semibold py-3 px-2  border-r">
                  {user.name}
                </td>
                <td className="text-ms py-3 px-2  font-semibold">
                  {user.submissions.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center mt-16 mb-8 justify-center ">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon
            //left arrow
            icon={faArrowLeft}
            className="mr-2"
            size="sm"
            color={currentPage == 1 ? "grey" : "dark grey"}
          />
        </button>
        <span className=" mx-4 ">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon
            //right arrow
            icon={faArrowRight}
            className="ml-2"
            size="sm"
            color={currentPage == totalPages ? "grey" : "dark grey"}
          />
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
