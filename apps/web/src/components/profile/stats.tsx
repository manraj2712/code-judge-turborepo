import React from 'react'
import ProgressBar from './progressbar'
import DonutProgressBar from './donoughtChart'
import logo from '../../../public/images/logo.png'
import Image from 'next/image'

const stats = () => {
  return (
    <div className='flex flex-col h-50 sm:h-fit mt-3 sm:mt-10 w-70 sm:w-80 bg-white sm:ml-10 rounded sm:shadow-md sm:shadow-slate-100 sm:z-10 p-4'>
        <div className="flex flex-row justify-between mb-3">
            <div className='flex flex-row h-fit w-fit'>
            <Image src={logo} alt="logo" className='h-6 w-6' />
            <div className='justify-start font-semibold' style={{color:"black"}} >username</div>
            </div>
            <div className='justify-end mr-4 'style={{color:"grey"}}>rank</div>
        </div>
        <div className='flex flex-row gap-4 h-fit w-full justify-center items-center'>
        
        <div className='flex justify-start items-start h-20 sm:h-32 w-20 sm:w-32 '><DonutProgressBar/></div>
        <div className='flex flex-col h-fit w-full mr-3'>
            <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-semibold' style={{color:"black"}} >easy</div>
            <div className='justify-end font-normal' style={{color:"black"}} >50/100</div>
            </div>
            <ProgressBar Total_Questions={100} questions_completed={50} color={"green"}/>
            <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-semibold' style={{color:"black"}} >medium</div>
            <div className='justify-end font-normal' style={{color:"black"}} >20/40</div>
            </div>
            <ProgressBar Total_Questions={40} questions_completed={20} color={"yellow"}/>
            <div className='flex flex-row justify-between mr-3'>
            <div className='justify-start font-semibold' style={{color:"black"}} >hard</div>
            <div className='justify-end font-normal' style={{color:"black"}} >30/50</div>
            </div>
            <ProgressBar Total_Questions={50} questions_completed={30} color={"red"}/>
        </div>
        </div>
    </div>
  )
}

export default stats;