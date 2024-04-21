import React from "react";
import ProgressBar from "./progressbar";
import DonutProgressBar from "./donoughtChart";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import { getServerSession } from "next-auth";
import "./style.css";
import { Difficulty, Status, prisma } from "@manraj2712/database";
const stats = async () => {
  const session = await getServerSession();
  const res = await prisma.problem.groupBy({
    by: ["difficulty"],
    _count: {
      id: true,
    },
  });

  const totalQuestionsByDifficultyMap = res.reduce(
    (acc, curr) => {
      acc[curr.difficulty] = curr._count.id;
      return acc;
    },
    {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
    }
  );
  let userSubmissionsByDifficulty = {
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
  };

  if (session && session.user && session.user.email) {
    // fetch questions completed by user based on difficulty from submissions table use groupBy and check difficulty from problem table
    const submissions = await prisma.submission.findMany({
      where: {
        user: {
          email: session.user.email,
        },
        status: Status.AC,
      },
      include: {
        problem: true,
      },
    });

    userSubmissionsByDifficulty = submissions.reduce(
      (acc, submission) => {
        const difficulty = submission.problem.difficulty;
        if (acc[difficulty] === undefined) {
          acc[difficulty] = 0;
        }
        acc[difficulty]++;
        return acc;
      },
      {
        EASY: 0,
        MEDIUM: 0,
        HARD: 0,
      }
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between mb-3">
        <div className="justify-start font-semibold text-neutral-200 text-xs">
          Solved Problems
        </div>

        <div
          className="justify-end font-semibold text-neutral-200 text-xs mr-4 "
          style={{ color: "grey" }}
        >
          rank
        </div>
      </div>
      <div className="flex flex-row gap-4 h-full w-full ">
        <div className="flex justify-center items-center w-full h-fit donut">
          <DonutProgressBar
            questionsCompletedByUser={
              userSubmissionsByDifficulty.EASY +
              userSubmissionsByDifficulty.MEDIUM +
              userSubmissionsByDifficulty.HARD
            }
            totalQuestions={
              totalQuestionsByDifficultyMap.EASY +
              totalQuestionsByDifficultyMap.MEDIUM +
              totalQuestionsByDifficultyMap.HARD
            }
          />
        </div>
        <div className="flex flex-col h-fit gap-2 w-full mr-3">
          <div className="flex flex-row justify-between mr-3">
            <div className="justify-start font-medium text-xs text-neutral-200">
              Easy
            </div>
            <div className="justify-end font-semibold text-xs text-neutral-200">
              {userSubmissionsByDifficulty.EASY}/
              {totalQuestionsByDifficultyMap.EASY}
            </div>
          </div>
          <ProgressBar
            Total_Questions={totalQuestionsByDifficultyMap.EASY}
            questions_completed={userSubmissionsByDifficulty.EASY}
            color={"#29A01A"}
            bgcolor={"#294d35"}
          />
          <div className="flex flex-row justify-between mr-3">
            <div className="justify-start font-medium text-xs text-neutral-200">
              Medium
            </div>
            <div className="justify-end font-semibold text-xs text-neutral-200">
              {userSubmissionsByDifficulty.MEDIUM}/
              {totalQuestionsByDifficultyMap.MEDIUM}
            </div>
          </div>
          <ProgressBar
            Total_Questions={totalQuestionsByDifficultyMap.MEDIUM}
            questions_completed={userSubmissionsByDifficulty.MEDIUM}
            color={"#B99A16"}
            bgcolor={"#5e4e25"}
          />
          <div className="flex flex-row justify-between mr-3">
            <div className="justify-start font-medium text-xs text-neutral-200">
              Hard
            </div>
            <div className="justify-end font-semibold text-xs text-neutral-200">
              {userSubmissionsByDifficulty.HARD}/
              {totalQuestionsByDifficultyMap.HARD}
            </div>
          </div>
          <ProgressBar
            Total_Questions={totalQuestionsByDifficultyMap.HARD}
            questions_completed={userSubmissionsByDifficulty.HARD}
            color={"#B91616"}
            bgcolor={"#5a302f"}
          />
        </div>
      </div>
    </div>
  );
};

export default stats;
