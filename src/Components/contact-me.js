
"use client";
import EF from '../Components/ef'
import { useState, useRef } from "react";
import contact from '../images/contac-icon.svg'
import {
  // Accordion,
  // AccordionHeader,
  // AccordionBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// function Icon({ id, open }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className={`${
//         id === open ? "rotate-180" : ""
//       } h-5 w-5 transition-transform`}
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//     </svg>
//   );
//     }
export default function Home() {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => setOpen(!open);
  // const [openAccordion, setOpenAccordion] = useState(0);
  const clickRef = useRef();

  // const handleAccordion = (value) => {
  //   setOpenAccordion(openAccordion === value ? 0 : value);
  // };

  return (
    <>
      <button onClick={handleDrawer} className="p-3">
        <img src={contact} alt="Contact-Me" className=" h-[35px] w-[30px] mt-[-32px]"  />
      </button>
      <div
        ref={clickRef}
        className={`${
          open ? "translate-x-0" : "translate-x-[100vw]"
        } fixed sm:top-2 right-2 z-40 ease-in-out duration-300 sm:w-[95vw] md:w-[50vw] lg:w-[30vw] m-2 sm:m-3 p-5 rounded-lg backdrop-blur h-full`}
      >
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h5" color="white">
            Contact Me
          </Typography>
          <IconButton variant="text" color="white" onClick={handleDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center justify-start p-3 h-half">

            <div className="flex space-around">
                 <EF/>
            </div>
        </div>
      </div>
    </>
  );
}