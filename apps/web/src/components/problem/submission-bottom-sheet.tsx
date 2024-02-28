"use client";
import { bottomSheetState } from "@/store/atoms/problem";
import { useSetRecoilState, useRecoilValue } from "recoil";
import ProcessingSpinner from "../utils/processing_spinner";
import { useEffect, useState } from "react";
import { Language } from "@manraj2712/database";
import { useSession } from "next-auth/react";


async function submitCode({
  code,
  problemId,
  language,
}: {
  code: string;
  problemId: string;
  language: Language;
}) {
  const response = await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify({ code, problemId, language }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}


export default function SubmissionBottomSheet({
  solutionClassCode,
  problemId,
  language,
}: {
  solutionClassCode: string;
  problemId: string;
  language: Language;
}) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const open = useRecoilValue(bottomSheetState);

  const session = useSession();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    if (!session.data?.expires) {
      console.log("no session");
      setLoading(false);
      return;
    }
    submitCode({ code: solutionClassCode, language, problemId }).then((res) => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      setLoading(false);
    });
  }, [open]);

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
          {loading ? <ProcessingSpinner /> : <pre>{output}</pre>}
        </div>
      )}
    </>
  );
}

function SubmitSheetHeader() {
  const setOpen = useSetRecoilState(bottomSheetState);
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
