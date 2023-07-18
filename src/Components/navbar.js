import React from 'react'
import logo from '../images/pinchit.svg'

import contact from '../images/contac-icon.svg'
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
        <div className="flex justify-content-end">
            <img src={logo} className='max-md:w-[15vw] max-lg:w-[12vw] w-[8vw] max-sm:w-[25vw] pt-2 pl-2 ' alt='logo' />
            <button className={btnClass['btn']}  style={{ position: 'absolute', top: '28px', right: '3%' }}>
             <Page/>
            </button> 
            <button className={btnClass['btn']} style={{ position: 'absolute', top: '28px', right: '6%' }}>
            <Contact/>
            </button>
        </div>
    </div>
  )
}
export default navbar