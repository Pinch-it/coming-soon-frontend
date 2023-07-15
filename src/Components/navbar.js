import React from 'react'
import logo from '../images/pinchit.svg'
function navbar() {
  return (
    <div>
        <div className="flex">
            <img src={logo} className='max-md:w-[15vw] max-lg:w-[12vw] w-[8vw] max-sm:w-[25vw] pt-2 pl-2 ' alt='logo' />
             

        </div>
    </div>
  )
}

export default navbar