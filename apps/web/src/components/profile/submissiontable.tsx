'use client';
import React, { useState } from 'react'
import ProblemsList from '../explore/problems-list';
const navigation = [
    { name: "Recent AC" },
    { name: "Solutions" },
    { name: "Discuss" }
];

const Submissiontable = () => {
    const [selectedTab, setSelectedTab] = useState('Recent AC');

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };
    return (
        <div className='hidden md:flex rounded h-3/6 bg-white m-10 p-5 mb-3 w-[900px] '>
            <div className='flex flex-col gap-8 w-full'>
                <div className="justify-start space-x-4 w-full">
                    {
                        navigation.map((item) => {
                            return (
                                <button className={selectedTab === item.name ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : " rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white"} onClick={() => handleTabClick(item.name)}>{item.name}</button>
                            );
                        }
                        )}
                </div>
                <div className="text-gray-700 overflow-scroll ">
                    {selectedTab === 'Recent AC' && <div>{<ProblemsList/>}</div>}
                    {selectedTab === 'Solutions' && <div>Content for Tab 2</div>}
                    {selectedTab === 'Discuss' && <div>Content for Tab 3</div>}
                </div>
            </div>





        </div>
    )
}

export default Submissiontable;