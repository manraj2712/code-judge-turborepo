"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserWithSubmissions } from "@/types/user";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const columns = [
  { id: "rank", label: "Rank" },
  { id: "user", label: "User" },
  { id: "problems", label: "Solved Problems" },
];

const Leaderboard = () => {
  const [users, setUsers] = useState<UserWithSubmissions[]>([]);
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
      const sortedUsers = usersWithSubmissions.sort(
        (a: UserWithSubmissions, b: UserWithSubmissions) =>
          a.name.localeCompare(b.name)
      );
      const totalUsersCount = res.data.userCount; // Get total count from response headers

      setTotalPages(Math.ceil(totalUsersCount / offset)); // Calculate total pages based on total count
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-1 flex-col items-center mb-5 md:px-10">
      <div className="flex flex-col flex-1 w-full gap-5">
        <div className=" flex my-8 justify-center items-center lg:-ml-24">
          <h1 className="text-2xl font-semibold text-center">Leaderboard</h1>
          <TrophyIcon className="ml-3" width={20} height={20} color="gold" />
        </div>
        <div className="flex overflow-hidden rounded-md ">
          <table className="table-fixed overflow-y-scroll lg:table-auto min-w-full">
            <thead>
              <tr className="bg-slate-200 border-none">
                {columns.map((column, index) => (
                  <th
                    key={column.id}
                    className={`lg:px-6 py-3 text-center" ${
                      column.id == "user" ? "w-[70%]" : "w-auto"
                    } text-base font-medium text-black `}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const showTrophy = (currentPage - 1) * offset + index + 1 < 4;
                return (
                  <tr
                    key={user.id}
                    className="odd:bg-neutral-900 text-gray-200"
                  >
                    <td className="flex px-6 py-4 text-base text-center items-center justify-center">
                      {showTrophy && (
                        <TrophyIcon
                          width={15}
                          height={15}
                          className="text-sm"
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
                      )}
                      {!showTrophy && <div className="w-3"></div>}
                      <span className="mx-2 text-center">
                        {(currentPage - 1) * offset + index + 1}
                      </span>
                    </td>
                    <td className="table-cell px-6 py-4 text-base text-center hover:text-blue-700">
                      <Link
                        href={`/profile/${user.username}`}
                        children={<p>{user.name}</p>}
                      />
                    </td>
                    <td className="table-cell px-6 py-4 text-base text-center">
                      {user.submissions.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowLeftIcon
            className="mr-2"
            width={20}
            color={currentPage == 1 ? "grey" : "dark grey"}
          />
        </button>
        <span className=" mx-4 ">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ArrowRightIcon
            className="mr-2"
            width={20}
            color={currentPage == totalPages ? "grey" : "dark grey"}
          />
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
