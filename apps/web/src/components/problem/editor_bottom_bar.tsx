import { useRecoilState } from "recoil";
import { bottomSheetState } from "@/store/atoms/problem";

export default function EditorBottomBar() {
  const [open, setOpen] = useRecoilState(bottomSheetState);
  return (
    <div className="flex px-5 py-2 z-10 fixed bottom-0 bg-neutral-800 justify-end text-sm" style={{
      width: 'inherit'
    }}>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-4 rounded inline-flex items-center"
        onClick={() => {
          setOpen(true);
        }}
      >
        Compile and Run
      </button>
      <span style={{ width: "20px" }}></span>
      <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-4 rounded">
        Submit
      </button>
    </div>
  );
}
