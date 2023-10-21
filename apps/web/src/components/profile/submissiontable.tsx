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
            <div className='flex flex-col w-full h-full'>
                <div className="justify-start space-x-4 w-full m-5 ">
                    {
                        navigation.map((item) => {
                            return (
                                <button className={selectedTab === item.name ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : " rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white"} onClick={() => handleTabClick(item.name)}>{item.name}</button>
                            );
                        }
                        )}
                </div>
                <div className="text-neutral-200 m-5 h-full overflow-auto ">
                    {selectedTab === 'Recent AC' && <ProblemsList/>}
                    {selectedTab === 'Solutions' && <div>Content for Tab 2</div>}
                    {selectedTab === 'Discuss' && <div>Content for Tab 3</div>}
                </div>
            </div>
    )
}

export default Submissiontable;