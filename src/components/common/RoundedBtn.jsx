import React from 'react'

const RoundedBtn = ({icon,onClick}) => {
  return (
      <button type='button' className='text-[#8797a1] text-xl p-2 rounded-full hover:bg-[#3c454c]' onClick={onClick}>{icon}</button>
  )
}

export default RoundedBtn
