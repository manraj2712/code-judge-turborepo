import { prisma } from "@manraj2712/database";
import ProblemSubmittionScreen from "@/components/problem/screen";
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


export default async function ProblemPage({ params: { id } }: { params: { id: string } }) {

  if (!id) return <div>
    {"No problem id provided."}
  </div>

  const problem = await prisma.problem.findUnique({
    where: {
      id: id as string
    }
  });

  if (!problem) return <div>
    {"Problem not found."}
  </div>

  return (
    <ProblemSubmittionScreen problem={{
      id: problem.id,
      description,
      boilerplate: code,
      header: {
        title: problem.title,
        difficulty: problem.difficulty,
        acceptanceRate: problem.acceptanceRate,
        totalSubmissions: problem.totalSubmissions
      }
    }} />
  )
}
