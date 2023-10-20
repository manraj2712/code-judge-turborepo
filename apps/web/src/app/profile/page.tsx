import React from 'react'
import ProfileCard from '@/components/profile/profile';
import Stats from '@/components/profile/stats';
const Profile = () => {
  return (
    <div className="flex flex-col mx-2 sm:flex-row mt-2">
        <ProfileCard />
        <Stats/>
    </div>
  )
}

export default Profile