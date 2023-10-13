export interface Problem {
    id: string;
    header: ProblemHeader;
    description: string;
}

export type ProblemHeader = {
    title: string;
    difficulty: string;
    acceptancePercentage: number;
    submissionsCount: number;
}