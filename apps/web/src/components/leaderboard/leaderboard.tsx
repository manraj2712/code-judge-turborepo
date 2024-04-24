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
import Loading from "@/app/leaderboard/loading";
const Leaderboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 2; // Update page size to a reasonable value, like 10

  const fetchUsers = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaderboard?page=${currentPage}&pageSize=${pageSize}`;
      const res = await axios.get(url);
      const usersWithSubmissions = res.data;
      const sortedUsers = usersWithSubmissions.sort((a: User, b: User) =>
        a.name.localeCompare(b.name)
      );
      const totalUsersCount = res.headers["x-total-count"]; // Get total count from response headers

      setTotalPages(Math.ceil(totalUsersCount / pageSize)); // Calculate total pages based on total count
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex justify-center items-center mt-8 gap-4 ">
        <h1 className=" font-bold text-2xl ">
          Leaderboard <FontAwesomeIcon icon={faTrophy} color="gold" />
        </h1>
      </div>
      <div className="flex flex-col m-4 rounded-md overflow-hidden">
        <div className="rounded-md overflow-hidden">
          <table className="table-fixed overflow-y-scroll lg:table-auto min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase ">
                <th className="px-4 py-3">Rankings</th>
                <th className="px-4 py-3  ">Name</th>
                <th className="hidden sm:table-cell px-4 py-3 ">
                  Accepted Submissions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-neutral-900 even:bg-neutral-700  text-gray-200"
                >
                  <td className="px-4 py-3 text-ms font-semibold border-r text-center  ">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className={`mr-2 text-sm ${
                        (currentPage - 1) * pageSize + index + 1 < 4
                          ? "visible"
                          : "hidden"
                      }`}
                      color={
                        (currentPage - 1) * pageSize + index + 1 === 1
                          ? "gold"
                          : (currentPage - 1) * pageSize + index + 1 === 2
                            ? "silver"
                            : (currentPage - 1) * pageSize + index + 1 === 3
                              ? "orange"
                              : undefined
                      }
                    />
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-3 text-ms  font-semibold border-r-0 sm:border-r text-center ">
                    {user.name}
                  </td>
                  <td className="hidden sm:table-cell  px-4 py-3 text-ms font-semibold text-center ">
                    {user.submissions.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex item-center m-8 justify-center ">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon
              //left arrow
              icon={faArrowLeft}
              className="mr-2 text-sm"
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
              className="ml-2 text-sm"
              color={currentPage == totalPages ? "grey" : "dark grey"}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
