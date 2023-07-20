import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;
    return regex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      setEmailSubmitted(true);
      return;
    }

    try {
      const response = await fetch('https://coming-soon-coff.onrender.com/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        setIsRegistered(true);
        console.log('Email sent successfully!');
        setTimeout(() => {
          window.location.reload(false)
        }, 3000)
      } else {
        console.log('Failed to send email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
    setEmailSubmitted(false);
  };

  return (
    <form className="mt-[5vh] z-1000">
      <input
        className={`h-[2.5rem] sm:w-[24rem] md:w-[32rem] lg:w-[40rem] px-[7px] rounded-full ${!isValidEmail && emailSubmitted ? 'border-red-500' : ''}`}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button className="bg-indigo-300 h-[2.5rem] text-white sm:w-[6rem] md:w-[12rem] lg:w-[10rem] pt-[1px] px-[5px] ml-2 rounded-full text-stone-100' text-stone-100" type="submit" onClick={handleSubmit}>
        SUBSCRIBE
      </button>
      {!isValidEmail && emailSubmitted && (
        <p className="text-red-500 text-sm mt-1 relative">
          Invalid email address
        </p>
      )}
      {isRegistered && (
        <p className="text-green-500 text-sm mt-2 relative">
          Thank you for registering!


          
        </p>
      )}
    </form>
  );
};

export default EmailForm;
