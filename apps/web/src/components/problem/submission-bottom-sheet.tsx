"use client";
import { bottomSheetState } from "@/store/atoms/problem";
import { useSetRecoilState, useRecoilValue } from "recoil";
import ProcessingSpinner from "../utils/processing_spinner";
import { useEffect, useState } from "react";
import axios from "axios";

async function submitCode(code: string) {
  const response = await axios.post("http://localhost:3000/api/submit-code", {
    code: code,
  });
  return response;
}

export default function SubmissionBottomSheet({
  solutionClassCode,
}: {
  solutionClassCode: string;
}) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const open = useRecoilValue(bottomSheetState);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    submitCode(solutionClassCode)
      .then((resp) => {
        console.log(resp.data.output);
        setOutput(resp.data.output);
      })
      .catch((err) => {
        setOutput(err.response.data.error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [open]);

  return (
    <>
      {open && (
        <div
          style={{
            padding: "10px",
            justifyContent: "start",
            height: "calc(100vh - 4rem)",
            width: "99%",
            backgroundColor: "rgb(48 47 47)",
            borderRadius: "1rem 1rem 0 0",
            position: "absolute",
            bottom: "0",
            zIndex: 100,
          }}
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
