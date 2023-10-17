import { useRecoilState } from "recoil";
import { bottomSheetState } from "@/store/atoms/problem";

export default function EditorBottomBar() {
  const [open, setOpen] = useRecoilState(bottomSheetState);
  return (
    <div
      className="flex px-5 py-2 z-10 lg:fixed lg:bottom-0 bg-neutral-800 justify-end text-sm"
      style={{
        width: "inherit",
      }}
    >
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-[6px] px-4 rounded inline-flex items-center"
        onClick={() => {
          setOpen(true);
        }}
      >
        Compile and Run
      </button>
      <span style={{ width: "20px" }}></span>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-[6px] px-4 rounded">
        Submit
      </button>
    </div>
  );
}
