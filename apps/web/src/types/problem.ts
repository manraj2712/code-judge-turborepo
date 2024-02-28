export interface Problem {
    id: string;
    header: ProblemHeader;
    description: string;
    boilerplate: string;
}

export type ProblemHeader = {
    title: string;
    difficulty: string;
    acceptanceRate: number;
    totalSubmissions: number;
}