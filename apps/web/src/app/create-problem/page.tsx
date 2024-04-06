"use client";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import axios from "axios";

const handleSubmit = async ({
  title,
  difficulty,
  description,
  boilerplate,
}: {
  title: string;
  difficulty: string;
  description: string;
  boilerplate: string;
}) => {
  try {
    const createdProblem = await axios.post("/api/problems", {
      title,
      difficulty: difficulty.toUpperCase(),
      description,
      boilerplate,
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
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [creatingProblem, setCreatingProblem] = useState(false);
  return (
    <div className="min-h-screen flex flex-col p-10">
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
      <h3>Initial Code</h3>
      <div className="grid h-32 grid-cols-2 text-white border-white border rounded-xl">
        <div>
          <textarea
            value={initCode}
            onChange={(e) => setInitCode(e.target.value)}
            className="w-full h-full bg-black p-5"
          ></textarea>
        </div>
        <div>
          <div className="h-full w-full border-white border p-5">
            <ReactMarkdown>{initCode}</ReactMarkdown>
          </div>
        </div>
      </div>
      <h3 className="mt-10">Problem Description</h3>
      <div className="flex-1 grid grid-cols-2 text-white border-white border rounded-xl">
        <div>
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
      <button
        className="cta-button-primary mt-5"
        onClick={async () => {
          setCreatingProblem(true);
          const response = await handleSubmit({
            title,
            difficulty,
            description: probblemDesc,
            boilerplate: initCode,
          });
          setCreatingProblem(false);
          if (response.success) {
            // reset the form
            setTitle("");
            setDifficulty("Easy");
            setProbblemDesc("");
            setInitCode("");
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
