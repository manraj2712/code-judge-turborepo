import React from 'react'
import { getServerSession } from "next-auth";
import ProfileCard from '@/components/profile/profile';
import Stats from '@/components/profile/stats';
import Submissiontable from '@/components/profile/submissiontable';
const Profile = async () => {
  const session = await getServerSession();

  return (


    session ? (
      <div className="flex flex-col mx-2 sm:flex-row mt-2 bg-black " >
        <div className='w-70 sm:w-80 bg-neutral-900 rounded-lg md:mt-0 xl:px-10 mb-4 h-full  px-4 sm:px-6 py-4 sm:py-6 '>
          <ProfileCard />
        </div>

        <div className='flex flex-col w-full '>
          <div className='h-1/3 sm:h-fit mt-3 sm:mt-10 w-70 sm:w-96 bg-neutral-900 sm:ml-10 rounded p-4'>
            <Stats />
          </div>
          <div className='hidden md:flex rounded h-full bg-neutral-900 m-10 mb-3 ' >
            <Submissiontable />
          </div>

        </div>
      </div >
    ) : (
      <div className="justify-center item-center flex">You are not authenticated. Please log in.</div>
    )

  )
}


export default Profile;