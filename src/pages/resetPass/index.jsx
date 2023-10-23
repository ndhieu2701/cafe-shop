import React, { useState } from "react";
import FormResetPass from "../../components/formResetPass";

const ResetPass = () => {
  const [isInputEmail, setIsInputEmail] = useState(0);
  return (
    <div className="w-full min-h-[100vh] bg-coffee-bg bg-no-repeat bg-center bg-cover opacity-80 flex justify-center items-center">
      <div className="w-1/2 min-w-[360px] rounded-md border bg-white/60 shadow-2xl flex flex-col items-center justify-center">
        <div className="w-full flex justify-center mt-8 text-main-color mb-10">
          <div className="text-center">
            <h1 className="font-bold uppercase text-2xl">Forgot password</h1>
            <p className="text-lg">
              {isInputEmail === 0
                ? "Please input your email to receive a code to reset password"
                : isInputEmail === 1
                ? "Please input your code to reset password"
                : "Please input your new password"}
            </p>
          </div>
        </div>
        <div className="w-3/4">
          <FormResetPass
            isInputEmail={isInputEmail}
            setIsInputEmail={setIsInputEmail}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
