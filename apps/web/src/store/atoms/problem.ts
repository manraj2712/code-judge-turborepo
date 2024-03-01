import { atom } from "recoil";

export const bottomSheetLoadingState = atom<boolean>({
  key: "bottomSheetLoadingState",
  default: false,
});

export const bottomSheetOpenState = atom<boolean>({
  key: "bottomSheetOpenState",
  default: false,
});

export const submissionOutputState = atom<string>({
  key: "submissionOutputState",
  default: "",
});

export const submissionIdState = atom<string>({
  key: "submissionIdState",
  default: "",
});
