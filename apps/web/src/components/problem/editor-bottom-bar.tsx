"use client";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import {
  bottomSheetOpenState,
  bottomSheetLoadingState,
  submissionIdState,
} from "@/store/atoms/problem";
import { useState } from "react";
import { Language } from "@manraj2712/database";
import toast from "react-hot-toast";

async function submitCode({
  code,
  problemId,
  language,
}: {
  code: string;
  problemId: string;
  language: Language;
}) {
  const url = "/api/submit";
  const response = await axios({
    url,
    method: "POST",
    data: {
      code,
      problemId,
      language,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export default function EditorBottomBar({
  solutionClassCode,
  problemId,
  language,
}: {
  solutionClassCode: string;
  problemId: string;
  language: Language;
}) {
  const setOpen = useSetRecoilState(bottomSheetLoadingState);
  const setIsLoading = useSetRecoilState(bottomSheetOpenState);
  const setSubmissionId = useSetRecoilState(submissionIdState);

  return (
    <div
      className="flex px-5 py-2 z-10 lg:fixed lg:bottom-0 bg-neutral-800 justify-end text-sm"
      style={{
        width: "inherit",
      }}
    >
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-[3px] px-2 sm:py-[6px] sm:px-4  rounded inline-flex items-center"
        onClick={() => {
          setOpen(true);
          setIsLoading(true);
          submitCode({
            code: solutionClassCode,
            problemId,
            language,
          })
            .then((data) => {
              setSubmissionId(data.id);
            })
            .catch((err: any) => {
              console.log(err);
              setIsLoading(false);
              setOpen(false);
              if (err.response.status === 401) {
                return toast.error("Please login to submit the code");
              }
              toast.error("Failed to submit the code", err.response.data);
            });
        }}
      >
        Compile and Run
      </button>
      <span style={{ width: "20px" }}></span>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-[3px] px-2 sm:py-[6px] sm:px-4 rounded">
        Submit
      </button>
    </div>
  );
}
