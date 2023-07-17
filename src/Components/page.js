"use client";

import { useState, useRef } from "react";
import faq from '../images/faq-icon 1.png'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  IconButton,
  Button,
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
    question: <Typography color="white">"What is Lorem ipsum?"</Typography>,
    answer:<Typography color="white">
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  </Typography>
  },
  {
    id: 2,
    question: <Typography color="white">"What is Lorem ipsum?"</Typography>,
    answer:
    <Typography color="white">
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
</Typography>,
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
    < >
      <Button onClick={handleDrawer}><img src={faq} alt="FAQ" /></Button>
      <div
        ref={clickRef}
        className={`${
          open ? "translate-x-0" : "translate-x-[100vw]"
        } fixed sm:top-2 sm:right-2 z-40 ease-in-out duration-300 sm:w-[95vw] md:w-[50vw] lg:w-[30vw] m-2 sm:m-3 p-5 rounded-lg backdrop-blur-md h-full`}
      >
        <div className="mb-2 flex items-center justify-between">
          <Typography variant="h5" color="white">
            General FAQs
          </Typography>
          <IconButton variant="text" color="white" onClick={handleDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center justify-start p-3 h-full overflow-y-scroll">
          {Questions.map((question) => (
            <Accordion
              key={question.id}
              open={openAccordion === question.id}
              icon={<Icon id={question.id} open={openAccordion} />}
            >
              <AccordionHeader onClick={() => handleAccordion(question.id)}>
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
