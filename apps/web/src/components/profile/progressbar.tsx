import React from 'react'

const ProgressBar = ({questions_completed,Total_Questions,color}:any) => {
  const progress=(questions_completed/Total_Questions)*100;
  return (
    <div className="h-1 w-full mt-2 mb-2 bg-neutral-700">
      <div className="h-1 bg-blue-400 " style={{width:progress+"%", backgroundColor:color}}></div>
    </div>
  )
}

export default ProgressBar