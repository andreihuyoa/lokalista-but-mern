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
        {/* SVG Background Accent */}
        <div
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            background: `url(${bgaccent}) no-repeat center/cover`,
            maskImage: "linear-gradient(to bottom, black 40% transparent 100%",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex w-full flex-col items-center">
          {/* Top */}
          <div className="flex w-full items-center justify-between">
            <ModeToggle className="px-6" />

            <Button
              variant="link"
              asChild
              className="font-SFProRounded text-primary dark:text-slate-200"
            >
              <Link to="/login">Already have an account?</Link>
            </Button>
          </div>

          {/* Lokalista Heading */}
          <h1 className="font-TanPearl text-lh1 my-16 flex justify-center text-black dark:text-slate-200">
            Lokal<span className="text-primary dark:text-primary">i</span>sta
          </h1>

          {/* Middle */}
          <div className="flex flex-row items-center gap-16">
            {/* Image */}
            <div className="w-full md:w-auto">
              <img src={computerguy} alt="its me clairo!" />
            </div>
            {/* Texts
             update the letter spacing
            */}
            <div className="font-SFProDisplay flex flex-row items-center gap-6 tracking-[0.030em] text-black dark:text-white">
              <h2 className="text-5xl font-extrabold">Start</h2>
              <div className="flex flex-col">
                <p className="text-3xl font-thin">
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
