import React from 'react'
import { getServerSession } from "next-auth";
import ProfileCard from '@/components/profile/profile';
import Stats from '@/components/profile/stats';
   const Profile = async () => {
    const session = await getServerSession();
    
    return (
      <div className="flex flex-col mx-2 sm:flex-row mt-2">
         {session ? (
          <>
            <ProfileCard/>
            <Stats />
          </>
        ) : (
          <div className="justify-center item-center flex">You are not authenticated. Please log in.</div>
        )}
      </div>
    )
  }


export default Profile;