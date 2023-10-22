import React from 'react'

const ProgressBar = ({questions_completed,Total_Questions,color,bgcolor}:any) => {
  const progress=(questions_completed/Total_Questions)*100;
  return (
    <div className="h-2 w-full mb-2 rounded" style={{backgroundColor:bgcolor}}>
      <div className="h-2 bg-blue-400 rounded" style={{width:progress+"%", backgroundColor:color}}></div>
    </div>
  )
}

export default ProgressBar