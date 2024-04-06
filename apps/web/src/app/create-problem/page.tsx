"use client";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const handleSubmit = async () => {};
export default function CreateProblemPage() {
  const [probblemDesc, setProbblemDesc] = useState("");
  return (
    <div className="min-h-screen flex flex-col p-10">
      <div className="grid grid-cols-3 gap-x-3 my-5">
        <input
          type="text"
          placeholder="Problem Title"
          className="bg-black text-white p-5 rounded-xl border-white border"
        />
        <select className="bg-black text-white p-5 rounded-xl border border-white">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
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
      <button className="bg-purple-400 px-5 py-2 mt-2 rounded-xl text-white p-5">
        Submit
      </button>
    </div>
  );
}
