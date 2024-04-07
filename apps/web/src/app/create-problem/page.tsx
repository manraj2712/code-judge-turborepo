"use client";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import axios from "axios";
import { Editor } from "@monaco-editor/react";

const handleSubmit = async ({
  title,
  difficulty,
  description,
  boilerplate,
  driverCode,
  input,
  expectedOutput,
}: {
  title: string;
  difficulty: string;
  description: string;
  boilerplate: string;
  driverCode: string;
  input: string;
  expectedOutput: string;
}) => {
  try {
    const createdProblem = await axios.post("/api/problems", {
      title,
      difficulty: difficulty.toUpperCase(),
      description,
      boilerplate,
      driverCode,
      input,
      expectedOutput,
    });
    return {
      success: true,
      data: createdProblem.data,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
};
export default function CreateProblemPage() {
  const [probblemDesc, setProbblemDesc] = useState("");
  const [initCode, setInitCode] = useState("");
  const [driverCode, setDriverCode] = useState("");
  const [title, setTitle] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [creatingProblem, setCreatingProblem] = useState(false);
  return (
    <div className="flex flex-col p-10">
      <div className="grid grid-cols-2 gap-x-3 my-5">
        <input
          type="text"
          placeholder="Problem Title"
          className="bg-black text-white p-5 rounded-xl border-white border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="bg-black text-white p-5 rounded-xl border border-white"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>EASY</option>
          <option>MEDIUM</option>
          <option>HARD</option>
        </select>
      </div>

      {/* Problem Description */}
      <div className="mt-10 flex flex-col gap-2">
        <div className="mt-10 grid grid-cols-2">
          <h3>Problem Description</h3>
          <h3>Preview</h3>
        </div>
        <div className="min-h-[36rem] grid grid-cols-2 text-white border-white border rounded-xl">
          <div className="h-full">
            <textarea
              value={probblemDesc}
              onChange={(e) => setProbblemDesc(e.target.value)}
              className="w-full h-full bg-black p-5"
            ></textarea>
          </div>
          <div>
            <div className="h-full w-full border-white border p-5">
              <ReactMarkdown>{probblemDesc}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editors for initial and driver code */}
      <div className="mt-10 flex flex-col gap-2">
        <div className="grid grid-cols-2">
          <h3>Initial Code</h3>
          <h3>Driver Code</h3>
        </div>
        <div className="grid min-h-[36rem] grid-cols-2 text-white border-white border rounded-xl">
          <div>
            <Editor
              theme="vs-dark"
              defaultLanguage="cpp"
              defaultValue={initCode}
              onChange={(data) => {
                setInitCode(data?.toString() || "");
              }}
              onMount={(editor) => {
                // setlgEditorMounted(true);
              }}
            />
          </div>
          <div>
            <Editor
              theme="vs-dark"
              defaultLanguage="cpp"
              defaultValue={driverCode}
              onChange={(data) => {
                setDriverCode(data?.toString() || "");
              }}
              onMount={(editor) => {
                // setlgEditorMounted(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Input and Expected Output */}
      <div className="mt-10 flex flex-col gap-2">
        <div className="grid grid-cols-2">
          <h3>Expected Input</h3>
          <h3>Expected Output</h3>
        </div>
        <div className="grid min-h-[36rem] grid-cols-2 text-white border-white border rounded-xl">
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full bg-black p-5"
            ></textarea>
          </div>
          <div>
            <textarea
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              className="w-full h-full bg-black p-5 border border-white rounded-xl"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Create Problem Button */}
      <button
        className="cta-button-primary mt-5"
        onClick={async () => {
          setCreatingProblem(true);
          const response = await handleSubmit({
            title,
            difficulty,
            description: probblemDesc,
            boilerplate: initCode,
            driverCode,
            input,
            expectedOutput,
          });
          setCreatingProblem(false);
          if (response.success) {
            // reset the form
            setTitle("");
            setDifficulty("Easy");
            setProbblemDesc("");
            setInitCode("");
            setDriverCode("");
            setInput("");
            setExpectedOutput("");
            alert("Problem created successfully");
          } else if (response.error) {
            alert("Failed to create problem");
          }
        }}
      >
        {creatingProblem ? "Creating Problem..." : "Create Problem"}
      </button>
    </div>
  );
}
