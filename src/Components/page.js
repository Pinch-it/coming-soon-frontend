"use client";

import { useState, useRef } from "react";
import faq from "../images/faq.svg";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const Questions = [
  {
    id: 1,
    question: <Typography color="white">What is Pinch.it?</Typography>,
    answer: (
      <Typography color="white" className="text-justify">
        Welcome to Pinchit, a secret gathering of tech enthusiasts! Explore the secrets of cutting-edge technology in a thriving development community. Uncover secret upgrades, demonstrate your technological prowess, and embrace the spirit of innovation. Join the mystery—the great reveal awaits!
      </Typography>
    ),
  },
  {
    id: 2,
    question: <Typography color="white">Who are we?</Typography>,
    answer: (
      <Typography color="white" className="text-justify">
        Step into the remarkable nexus of the future, where varied hearts combine in quest of the unknown. Accept limitless connections, partnerships, and celebrations as we embark on an enigma together. Join us, and you'll be at the cutting edge of tomorrow's infinite possibilities. The future is waiting for you.
      </Typography>
    ),
  },
  {
    id: 3,
    question: <Typography color="white">Why is Pinch.it?</Typography>,
    answer: (
      <Typography color="white" className="text-justify">
        Enter the digital shadows of Pinchit, the underground haven for tech visionaries and code rebels. Enjoy the excitement of deciphering mysterious updates on cutting-edge technologies and displaying your work among the thrilling camaraderie of other tech rebels. Prepare for an adrenaline-fueled adventure through the coolest tech community, soon to be revealed!
      </Typography>
    ),
  },
  {
    id: 4,
    question: <Typography color="white">When can you see us?</Typography>,
    answer: (
      <Typography color="white" className="text-justify">
        We are currently working on our entire throttle, and you can anticipate our debut at any moment soon. Please hold your breath, for once we are launched, we will not be stopping. Please click the subscribe button to never miss an update from Pinchit.
      </Typography>
    ),
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => setOpen(!open);
  const [openAccordion, setOpenAccordion] = useState(0);
  const clickRef = useRef();

  const handleAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  return (
    <>
      <button onClick={handleDrawer} className="p-3">
        <img src={faq} alt="FAQ" className="  h-[32px] w-[30px] ml-[8px]" />
      </button>
      <div
        ref={clickRef}
        className={`${
          open ? "translate-x-0" : "translate-x-[100vw]"
        } fixed sm:top-2 right-2 z-40 ease-in-out duration-300 sm:w-[95vw] md:w-[50vw] lg:w-[30vw] m-2 sm:m-3 p-5 rounded-lg backdrop-blur-md h-full`}
        style={{ backdropFilter: "blur(0.625rem)", WebkitBackdropFilter: "blur(0.625rem)"}}
      >
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h5" color="white">
            Your Right To Know
          </Typography>
          <IconButton variant="text" color="white" onClick={handleDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center justify-start p-3 h-full overflow-y-scroll">
          {Questions.map((question, index) => (
            <Accordion
              key={question.id}
              open={openAccordion === question.id}
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
          ))}
        </div>
      </div>
    </>
  );
}
