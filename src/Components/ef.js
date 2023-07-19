
import React, { useState } from 'react';

const EmailForm = () => {
 
  const email = useState('cofounder.pinchit.in')[0];
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert('Email copied to clipboard!');
  };

  return (
    <div className="flex">
      <form>
        <label>Email:</label>
        <input className="bg-white rounded-xl h-[2rem] px-[10px]" type="text" value={email} readOnly />
      </form>
      <button className="bg-indigo-300 h-[2rem] text-white px-[5px] ml-2 rounded-full text-stone-100 text-stone-100" onClick={copyToClipboard}>Copy Email</button>
    </div>
  );
};

export default EmailForm;
