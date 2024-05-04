import { Submission, User } from "@manraj2712/database";

export type UserWithSubmissions = {
  submissions: Submission[];
} & User;
