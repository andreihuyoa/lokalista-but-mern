import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ModeToggle from "@/components/ModeToggle";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-12">
      {/* TOP */}
      <div className="flex justify-end">
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
        <h1 className="flex justify-center font-TanPearl text-9xl text-black dark:text-white">
          Lokal<span className="text-primary dark:text-primary">i</span>sta
        </h1>

        {/* Pwede na alisin tong button since meron na registration buttons sa bottom part */}
        <Button asChild className="w-40 h-12 rounded-2xl">
          <Link to="/login">Get Started</Link>
        </Button>
      </div>
      {/* Middle */}
      <div className="flex flex-row items-center">
        {/* Image */}
        <div className="w-24 h-24">
          <img src="" alt="" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="">Manage and Work</h2>
          <p>
            all in <span className="">one</span>platform
          </p>
        </div>
      </div>
      <ModeToggle />
    </div>
  );
};

export default LandingPage;
