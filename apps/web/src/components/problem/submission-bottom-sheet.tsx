"use client";
import {
  bottomSheetLoadingState,
  bottomSheetOpenState,
  submissionIdState,
  submissionOutputState,
} from "@/store/atoms/problem";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProcessingSpinner from "../utils/processing_spinner";
import { useEffect } from "react";

const fetchStatusLongPoll = async ({
  submissionId,
  setSubmissionOutput,
  setLoading,
}: {
  submissionId: string | null;
  setSubmissionOutput: (output: string) => void;
  setLoading: (loading: boolean) => void;
}) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/submission-status?id=${submissionId}`;
  if (!submissionId) return;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json();
  if (data.status === "PENDING") {
    setTimeout(() => {
      if (data.status === "PENDING") {
        fetchStatusLongPoll({ submissionId, setSubmissionOutput, setLoading });
      }
    }, 5000);
  } else {
    setLoading(false);
    setSubmissionOutput(data.output);
  }
};
export default function SubmissionBottomSheet() {
  const open = useRecoilValue(bottomSheetOpenState);
  const loading = useRecoilValue(bottomSheetLoadingState);
  const output = useRecoilValue(submissionOutputState);
  const submissionId = useRecoilValue(submissionIdState);
  const setSubmissionOutput = useSetRecoilState(submissionOutputState);
  const setLoading = useSetRecoilState(bottomSheetLoadingState);

  useEffect(() => {
    if (submissionId) {
      fetchStatusLongPoll({
        submissionId,
        setSubmissionOutput: (output) => {
          setSubmissionOutput(output);
        },
        setLoading: (loading) => {
          setLoading(loading);
        },
      });
    }
  }, [submissionId]);
  return (
    <>
      {open && (
        <div
          style={{
            backgroundColor: "rgb(48 47 47)",
            borderRadius: "1rem 1rem 0 0",
          }}
          className="h-96 absolute w-[calc(85%)] sm:w-[calc(91%)] p-3 z-20 bottom-0 lg:h-[calc(100vh-64px)]  lg:w-[calc(99%)] lg:px-0 "
        >
          <SubmitSheetHeader />
          <div className="p-5">
            {loading ? <ProcessingSpinner /> : <pre>{output}</pre>}
          </div>
        </div>
      )}
    </>
  );
}

function SubmitSheetHeader() {
  const setOpen = useSetRecoilState(bottomSheetOpenState);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1rem",
        height: "3rem",
        marginTop: "1rem",
      }}
    >
      <h2>Output Window</h2>
      {/* <CloseIcon cursor={'pointer'} onClick={()=>{setOpen(false)}}/> */}
      <button
        onClick={() => {
          setOpen(false);
        }}
      >
        Close
      </button>
    </div>
  );
}
