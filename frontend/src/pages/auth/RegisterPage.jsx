import ModeToggle from "@/components/ModeToggle";
import React from "react";

import authpng from "../../assets/images/auth/auth-signup.svg";

const RegisterPage = () => {
  return (
    <>
      <ModeToggle />
      <div className="flex flex-row ">
        <div className="w-62 h-62">
          <img src={authpng} alt="meow!" />
        </div>
        <div className=" w-full bg-white">

        </div>
      </div>
    </>
  );
};

export default RegisterPage;
