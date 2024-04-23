import LeaderBoard from "@/components/leaderboard/leaderboard";
import React from "react";

import logo from "@/../public/images/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
const LeaderboardPage = () => {
  return (
    <>
      {/* add the logo after leaderboard */}
      <div className="flex justify-center items-center mt-8 gap-4 ">
        <h1 className=" font-bold text-2xl ">
          Leaderboard <FontAwesomeIcon icon={faTrophy} color="gold" />
        </h1>
      </div>

      <LeaderBoard />
    </>
  );
};

export default LeaderboardPage;
