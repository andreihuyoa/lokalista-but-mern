import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ModeToggle from "@/components/ModeToggle";

import clairo from "../assets/clairocotrill.jpg"; //replace with the actual image

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      {/* TOP */}
      <div className="flex justify-end w-full">
        <Button
          variant="link"
          asChild
          className="text-primary font-SFPro w-40 h-12 dark:text-slate-200"
        >
          <Link to="/login">Already have an account?</Link>
        </Button>
      </div>
      {/* Lokalista Heading */}
      <div className="flex flex-col items-center gap-16 mt-16">
        <h1 className="flex justify-center font-TanPearl text-lh1 text-black dark:text-white">
          Lokal<span className="text-primary dark:text-primary">i</span>sta
        </h1>

        {/* Pwede na alisin tong button since meron na registration buttons sa bottom part */}
        <Button asChild className="w-40 h-12 rounded-2xl">
          <Link to="/login">Get Started</Link>
        </Button>
      </div>
      {/* Middle */}
      <div className="flex flex-row items-center gap-32">
        {/* Image */}
        <div className="w-72 h-72">
          <img src={clairo} alt="its me clairo!" />
        </div>
        <div className="flex flex-col items-center font-ObjectSans ">
          <h2 className="font-extrabold">Manage and Work</h2>
          <p className="font-light">
            all in <span className="">one</span> platform
          </p>
        </div>
      </div>
      <ModeToggle />
    </div>
  );
};

export default LandingPage;
