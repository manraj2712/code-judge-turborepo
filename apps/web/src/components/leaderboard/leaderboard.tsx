"use client";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react";

const leaderBoard = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaderboard`;
        const res = await axios.get(url);
        const usersWithSubmissions = res.data.filter(
          (user: User) => user.submissions.length > 0
        );
        const sortedUsers = [...usersWithSubmissions].sort(
          (a: User, b: User) => {
            // First sort by the number of submissions
            const diff = b.submissions.length - a.submissions.length;
            if (diff !== 0) return diff;

            // If the number of submissions is the same, sort by name
            return a.name.localeCompare(b.name);
          }
        );
        // let rank = 1;
        // let prevSubmissionsCount = sortedUsers[0].submissions.length;
        // sortedUsers.forEach((user, index) => {
        //   if (user.submissions.length < prevSubmissionsCount) {
        //     rank = index + 1;
        //     prevSubmissionsCount = user.submissions.length;
        //   }
        //   user.rank = rank;
        // });

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="m-4 rounded-md overflow-hidden">
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
                  className="mr-2 text-sm"
                  color={
                    index + 1 === 1
                      ? "gold"
                      : index + 1 === 2
                        ? "silver"
                        : "#CD7F32"
                  }
                />
                {index + 1}
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
  );
};

export default leaderBoard;
