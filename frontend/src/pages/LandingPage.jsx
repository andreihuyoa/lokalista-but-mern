import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ModeToggle from "@/components/ModeToggle";

import clairo from "../assets/images/clairocotrill.jpg"; //replace with the actual image
import bgaccent from "../assets/images/background/Ellipse.svg";
import computerguy from "../assets/images/computerguy.svg";

const LandingPage = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen min-w-full items-center gap-12 px-10 py-5">
        {/* SVG accent */}
        <div
          className="absolute inset-0 w-full h-full  object-cover pointer-events-none z-0"
          style={{
            background: `url(${bgaccent}) no-repeat center/cover`,
            maskImage: "linear-gradient(to bottom, black 40% transparent 100%",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Top */}
          <div className="flex justify-between w-full items-center">
            <ModeToggle className="px-6" />

            <Button
              variant="link"
              asChild
              className="font-SFProRounded dark:text-slate-200 text-primary"
            >
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>

          {/* Lokalista Heading */}

          <h1 className="flex justify-center font-TanPearl text-lh1 text-black dark:text-slate-200 my-16">
            Lokal<span className="text-primary dark:text-primary">i</span>sta
          </h1>

          {/* Middle */}
          <div className="flex flex-row items-center gap-16">
            {/* Image */}
            <div className="w-full md:w-auto">
              <img src={computerguy} alt="its me clairo!" />
            </div>
            {/* Texts */}
            <div className="flex flex-row items-center font-SFProDisplay tracking-[0.030em] text-black dark:text-white gap-6">
              <h2 className="font-extrabold text-5xl">Start</h2>
              <div className="flex flex-col">
                <p className="font-thin text-3xl">
                  managing
                  <span className="text-primary">,</span>
                </p>
                <p>working</p>
              </div>
            </div>
          </div>
          <p>Lokalista provides you a platform to manage your teams and employee in one.</p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
