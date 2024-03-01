"use client";
import { useSetRecoilState } from "recoil";
import {
  bottomSheetOpenState,
  bottomSheetLoadingState,
  submissionIdState,
} from "@/store/atoms/problem";
import { useState } from "react";
import { Language } from "@manraj2712/database";

async function submitCode({
  code,
  problemId,
  language,
}: {
  code: string;
  problemId: string;
  language: Language;
}) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/submit`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ code, problemId, language }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
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
              console.log(data);
              setSubmissionId(data.id);
            })
            .catch((err) => {
              console.error(err);
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
