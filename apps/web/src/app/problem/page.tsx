"use client";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

import ProblemHeaderComponent from "@/components/problem/problem-header";
import ProblemDescription from "@/components/problem/problem-description";
import EditorBottomBar from "@/components/problem/editor-bottom-bar";
import SubmissionBottomSheet from "@/components/problem/submission-bottom-sheet";
const code: string = `
class Solution{
  public:
  int maxElementInArray(int n, vector<int> &arr){
    
  }
};
`;
const description: string = `The problem is to find the shortest distances between every pair of vertices in a given edge-weighted directed graph. The graph is represented as an adjacency matrix of size n*n. Matrix[i][j] denotes the weight of the edge from i to j. If Matrix[i][j]=-1, it means there is no edge from i to j.<strong> Do it in-place. <strong><br><br>
<div class='code_container'>
<code>
<strong>Example 1:</strong><br>
Input: matrix = {{0,1,43},{1,0,6},{-1,-1,0}}<br><br>
<img src='https://media.geeksforgeeks.org/wp-content/uploads/20221106202714/WhatsAppImage20221106at82359PM.jpeg' alt='floyd warshall example 1' width='100px' height='100px'><br>
Output: {{0,1,7},{1,0,6},{-1,-1,0}}<br>
Explanation: We can reach 2 from 0 as 0->1->2
and the cost will be 1+6=7 which is less than 
43.
</code>
</div>
`;
export default function ProblemSubmittionScreen() {
  const [sizes, setSizes] = useState(["auto", "55%"]);
  const [userCode, setUserCode] = useState(code);

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
                  header={{
                    title: "Floyd Warshall",
                    difficulty: "hard",
                    acceptancePercentage: 55,
                    submissionsCount: 1000,
                  }}
                ></ProblemHeaderComponent>
                <ProblemDescription
                  description={description}
                ></ProblemDescription>
                <ProblemDescription
                  description={description}
                ></ProblemDescription>
                <ProblemDescription
                  description={description}
                ></ProblemDescription>
              </div>
              <SubmissionBottomSheet
                solutionClassCode={userCode}
              ></SubmissionBottomSheet>
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
            />
            <EditorBottomBar></EditorBottomBar>
          </div>
        </SplitPane>
      </div>
      <div className="lg:hidden px-7 pt-3">
        <ProblemHeaderComponent
          header={{
            title: "Floyd Warshall",
            difficulty: "hard",
            acceptancePercentage: 55,
            submissionsCount: 1000,
          }}
        ></ProblemHeaderComponent>
        <ProblemDescription description={description}></ProblemDescription>
        <ProblemDescription description={description}></ProblemDescription>
        <ProblemDescription description={description}></ProblemDescription>

        <SubmissionBottomSheet
          solutionClassCode={userCode}
        ></SubmissionBottomSheet>
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
          />
          <EditorBottomBar />
        </div>
      </div>
    </div>
  );
}
