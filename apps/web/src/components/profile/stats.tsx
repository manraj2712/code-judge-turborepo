import React from 'react'
import ProgressBar from './progressbar'
import DonutProgressBar from './donoughtChart'
import logo from '../../../public/images/logo.png'
import Image from 'next/image'
import { getServerSession } from 'next-auth';
import './style.css'
const stats = async () => {
  const session = await getServerSession();
  const Total_Questions = 200;
  const questions_completed = 100
  return (
    <div className='flex flex-col w-full'>
      <div className="flex flex-row justify-between mb-3">

        <div className='justify-start font-semibold text-neutral-200 text-xs' >Solved Problems</div>

        <div className='justify-end font-semibold text-neutral-200 text-xs mr-4 ' style={{ color: "grey" }}>rank</div>
      </div>
      <div className='flex flex-row gap-4 h-full w-full '>

        <div className='flex justify-center items-center w-full h-fit donut'><DonutProgressBar questions_completed={questions_completed} Total_Questions={Total_Questions} /></div>
        <div className='flex flex-col h-fit gap-2 w-full mr-3'>
          <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-medium text-xs text-neutral-200'  >Easy</div>
            <div className='justify-end font-semibold text-xs text-neutral-200'  >50/100</div>
          </div>
          <ProgressBar Total_Questions={100} questions_completed={50} color={"#29A01A"} bgcolor={"#294d35"} />
          <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-medium text-xs text-neutral-200' >Medium</div>
            <div className='justify-end font-semibold text-xs text-neutral-200' >20/40</div>
          </div>
          <ProgressBar Total_Questions={40} questions_completed={20} color={"#B99A16"} bgcolor={"#5e4e25"} />
          <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-medium text-xs text-neutral-200'  >Hard</div>
            <div className='justify-end font-semibold text-xs text-neutral-200'>30/50</div>
          </div>
          <ProgressBar Total_Questions={50} questions_completed={30} color={"#B91616"} bgcolor={"#5a302f"}/>
        </div>
      </div>
    </div>
  )
}

export default stats;