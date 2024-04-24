import { User } from "@manraj2712/database";
import { atom } from "recoil";

export const userDetails = atom<User | undefined>({
  key: "user",
  default: undefined,
});
