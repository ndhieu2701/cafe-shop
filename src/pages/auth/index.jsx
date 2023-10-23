import React, { useEffect, useState } from "react";
import FormAuth from "../../components/formAuth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isAuth = Cookies.get("token");
  const navigate = useNavigate();
  const handleChangeMode = () => {
    setIsLogin(!isLogin);
  };

  if (isAuth) return navigate("/");

  return (
    <div className="w-full min-h-[100vh] bg-coffee-bg bg-no-repeat bg-center bg-cover opacity-80 flex justify-center items-center">
      <div className="w-1/2 min-w-[360px] rounded-md border bg-white/60 shadow-2xl flex flex-col items-center justify-center">
        <div className="w-full flex justify-center mt-8 text-2xl text-main-color mb-10">
          <div
            className={`w-1/2 max-w-[200px] rounded-md p-1 border-2 text-center mx-2 cursor-pointer ${
              isLogin ? "bg-main-color text-white" : "bg-white"
            }`}
            onClick={handleChangeMode}
          >
            Login
          </div>
          <div
            className={`w-1/2 max-w-[200px] rounded-md p-1 border-2 text-center mx-2 cursor-pointer ${
              !isLogin ? "bg-main-color text-white" : "bg-white"
            }`}
            onClick={handleChangeMode}
          >
            Register
          </div>
        </div>
        <FormAuth isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default AuthPage;
