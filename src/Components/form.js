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
    <form className="mt-[10vh] z-1000">
      <input
        className="h-[2.5rem] sm:w-[24rem] md:w-[32rem] lg:w-[40rem] rounded-lg"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-indigo-300 h-[2.5rem] sm:w-[8rem] md:w-[12rem] lg:w-[16rem] pt-[1px] ml-2 rounded-lg text-stone-100" type="submit" onClick={handleSubmit}>
        SUBSCRIBE
      </button>
    </form>
  );
};

export default EmailForm;
