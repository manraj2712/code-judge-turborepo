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
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaderboard`;
      const res = await axios({
        method: "get",
        url,
      });
      const sortedUsers = [...res.data].sort(
        (a: User, b: User) => b.submissions.length - a.submissions.length
      );
      setUsers(sortedUsers);
    };

    fetchUsers();
  }, []);
  let rank = 0;
  let prevUserSubmissionsLength = -1;
  users.forEach((user, index) => {
    if (user.submissions.length !== prevUserSubmissionsLength) {
      rank = index + 1;
      prevUserSubmissionsLength = user.submissions.length;
    }
    user.rank = rank;
  });
  return (
    <div className="m-4 rounded-md overflow-hidden shadow-lg">
      <table className="w-full">
        <thead className="border">
          <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Rankings</th>
            <th className="px-4 py-3">Name</th>
            <th className="hidden sm:table-cell ">Accepted Submissions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user, index) => (
            <tr key={index} className="text-gray-700">
              <td className="px-4 py-3 text-ms font-semibold border text-center">
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="mr-2 text-sm"
                  color={
                    user.rank === 1
                      ? "gold"
                      : user.rank === 2
                        ? "silver"
                        : "#CD7F32"
                  }
                />
                {user.rank}
              </td>
              <td className="px-4 py-3 text-ms font-semibold border text-center">
                {user.name}
              </td>
              <td className=" hidden sm:table-cell px-4 py-3 text-ms font-semibold border text-center">
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
