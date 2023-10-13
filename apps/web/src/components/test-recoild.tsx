'use client';
import { useRecoilValue } from "recoil";
import { bottomSheetState } from "@/store/atoms/problem";
export default function TestRecoil(){
    const bottomSheet = useRecoilValue(bottomSheetState); 
    return (
        <div>
            <h1>{bottomSheet ? 'Test Pass' : 'Test Fail'}</h1>
        </div>
    )
}