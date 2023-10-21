import React from 'react'
import ProgressBar from './progressbar'
import DonutProgressBar from './donoughtChart'
import logodark from '../../../public/images/logodark.png'
import Image from 'next/image'
import { getServerSession } from 'next-auth';
import './style.css'
const stats = async () => {
  const session = await getServerSession();
  const Total_Questions = 200;
  const questions_completed = 100
  return (
    <div className='flex flex-col h-50 sm:h-fit mt-3 sm:mt-10 w-70 sm:w-80 bg-white sm:ml-10 rounded sm:shadow-md sm:shadow-slate-100 sm:z-10 p-4'>
      <div className="flex flex-row justify-between mb-3">
        <div className='flex flex-row h-fit w-fit'>
          <Image src={logodark} alt="logo" className='h-6 w-12' />
          <div className='justify-start font-semibold ml-[-0.7rem]' style={{ color: "black" }} >{session?.user.name}</div>
        </div>
        <div className='justify-end mr-4 ' style={{ color: "grey" }}>rank</div>
      </div>
      <div className='flex flex-row gap-4 h-full w-full '>

        <div className='flex justify-center items-center w-full h-fit donut'><DonutProgressBar questions_completed={questions_completed} Total_Questions={Total_Questions} /></div>
        <div className='flex flex-col h-fit w-full mr-3'>
          <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-semibold' style={{ color: "black" }} >easy</div>
            <div className='justify-end font-normal' style={{ color: "black" }} >50/100</div>
          </div>
          <ProgressBar Total_Questions={100} questions_completed={50} color={"green"} />
          <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-semibold' style={{ color: "black" }} >medium</div>
            <div className='justify-end font-normal' style={{ color: "black" }} >20/40</div>
          </div>
          <ProgressBar Total_Questions={40} questions_completed={20} color={"yellow"} />
          <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-semibold' style={{ color: "black" }} >hard</div>
            <div className='justify-end font-normal' style={{ color: "black" }} >30/50</div>
          </div>
          <ProgressBar Total_Questions={50} questions_completed={30} color={"red"} />
        </div>
      </div>
    </div>
  )
}

export default stats;