"use client";
import "split-pane-react/esm/themes/default.css";
import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import { Editor } from "@monaco-editor/react";
import ProblemHeaderComponent from "./problem-header";
import ProblemDescription from "./problem-description";
import SubmissionBottomSheet from "./submission-bottom-sheet";
import { Problem } from "@/types/problem";
import EditorBottomBar from "./editor-bottom-bar";
import { Language } from "@manraj2712/database";
import ReactMarkdown from "react-markdown";

export default function ProblemSubmittionScreen({
  problem,
}: {
  problem: Problem;
}) {
  const [sizes, setSizes] = useState(["auto", "55%"]);
  const [userCode, setUserCode] = useState(problem.boilerplate);
  const [lgEditorMounted, setlgEditorMounted] = useState(false);
  const [editorMounted, setEditorMounted] = useState(false);

  return (
    <div>
      <div className="hidden lg:block h-[calc(100vh-64px)]">
        <SplitPane
          sizes={sizes}
          onChange={(newsize: any) => setSizes(newsize)}
          sashRender={() => {
            return <></>;
          }}
        >
          <Pane minSize="30%" maxSize="70%">
            <div className="h-full overflow-y-scroll">
              <div className="px-7 pt-3">
                <ProblemHeaderComponent
                  header={problem.header}
                ></ProblemHeaderComponent>
                <ReactMarkdown className="mb-10">
                  {problem.description}
                </ReactMarkdown>
              </div>
              <SubmissionBottomSheet />
            </div>
          </Pane>
          <div
            className="h-full"
            style={{
              width: "inherit",
            }}
          >
            <Editor
              theme="vs-dark"
              defaultLanguage="cpp"
              defaultValue={userCode}
              onChange={(data) => {
                setUserCode(data?.toString() || "");
              }}
              onMount={(editor) => {
                setlgEditorMounted(true);
              }}
            />
            {editorMounted && (
              <EditorBottomBar
                language={Language.CPP}
                problemId={problem.id}
                solutionClassCode={userCode}
              ></EditorBottomBar>
            )}
          </div>
        </SplitPane>
      </div>
      <div className="lg:hidden px-7 pt-3 relative">
        <ProblemHeaderComponent
          header={problem.header}
        ></ProblemHeaderComponent>
        <ProblemDescription
          description={problem.description}
        ></ProblemDescription>
        <ProblemDescription
          description={problem.description}
        ></ProblemDescription>
        <ProblemDescription
          description={problem.description}
        ></ProblemDescription>
        <div
          className="h-96 mt-10 mb-20"
          style={{
            width: "inherit",
          }}
        >
          <Editor
            theme="vs-dark"
            defaultLanguage="cpp"
            defaultValue={userCode}
            onChange={(data) => {
              setUserCode(data?.toString() || "");
            }}
            onMount={(_) => {
              setEditorMounted(true);
            }}
          />
          {editorMounted && (
            <EditorBottomBar
              language={Language.CPP}
              problemId={problem.id}
              solutionClassCode={userCode}
            ></EditorBottomBar>
          )}
          <SubmissionBottomSheet />
        </div>
      </div>
    </div>
  );
}
