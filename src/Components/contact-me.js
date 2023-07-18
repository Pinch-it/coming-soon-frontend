
"use client";
import EF from '../Components/ef'
import { useState, useRef } from "react";
import contact from '../images/contac-icon.png'
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
        <img src={contact} alt="Contact-Me" className=" h-[45px] mt-[-6px]"  />
      </button>
      <div
        ref={clickRef}
        className={`${
          open ? "translate-x-0" : "translate-x-[100vw]"
        } fixed sm:top-2 sm:right-2 z-40 ease-in-out duration-300 sm:w-[95vw] md:w-[50vw] lg:w-[30vw] m-2 sm:m-3 p-5 rounded-lg backdrop-blur-md h-full`}
      >
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h5" color="white">
            Contact Me
          </Typography>
          <IconButton variant="text" color="white" onClick={handleDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center justify-start p-3 h-full overflow-y-scroll">

            <div className="flex space-around">
                 <EF/>
            </div>
          {/* {Questions.map((question, index) => (
            <Accordion
              icon={<Icon id={question.id} open={openAccordion} />}
              className={
                index + 1 === Questions.length
                  ? "border-none"
                  : "border-b-2 border-[#4f5b66]"
              }
            >
              <AccordionHeader
                onClick={() => handleAccordion(question.id)}
                className="border-none"
              >
                {question.question}
              </AccordionHeader>
              <AccordionBody>{question.answer}</AccordionBody>
            </Accordion>
          ))} */}
        </div>
      </div>
    </>
  );
}
