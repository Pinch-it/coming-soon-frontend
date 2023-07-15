import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://coming-soon-coff.onrender.com/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.log('Failed to send email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (

    
    <form className='mt-[10vh] z-1000' onSubmit={handleSubmit}>
      <input 
        className='h-[2.5rem] w-[47rem] rounded-lg'
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className=' bg-indigo-300  h-[2.5rem] w-[6rem] pt-[1px] ml-2 rounded-lg text-stone-100' type="submit">SUBSCRIBE</button>
    </form>
  );
};

export default EmailForm;
