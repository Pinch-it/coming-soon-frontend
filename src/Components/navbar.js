import React from 'react'
import logo from '../images/pinchit.svg'
import Page from '../Components/page'
import Contact from '../Components/contact-me'
const btnClass = {
  'btn': {
    backgroundColor: 'white',
    cursor: 'pointer',
    padding: '5rem 2rem',
    borderRadius: '4px',
    color: '#333333',
    fontSize: '1rem',
  },
  'btn:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 0 5px #000000',
  },
};

function navbar() {
  return (
    <div>
        <div className="flex w-[95vw] justify-between px-[10px]">
          <div>
            <img src={logo} className='max-md:w-[15vw] max-lg:w-[12vw] w-[8vw] max-sm:w-[25vw] pt-2 pl-2' alt='logo' />
            </div>

            <div>
             <button className={btnClass['btn']}  style={{ position: 'relative'}}>
             <Page/>
            </button> 
            <button   className={btnClass['btn']} style={{ position: 'relative' }}>
  
            <Contact/>
            </button> 
            </div>
        </div>
    </div>
  )
}
export default navbar