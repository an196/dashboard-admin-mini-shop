import React from "react";
import backgroundImg from "../assets/headphone.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { SiShopware } from "react-icons/si";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-start item-center flex-col h-screen ">
      <div className="relative w-full h-full justify-items-center flex">
        <img
          src={backgroundImg}
          className="absolute overflow-hidden object-cover w-screen h-screen opacity-90 -z-10"
        />
        <form className="relative mt-10 space-y-8 rounded bg-white/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 flex flex-col items-center">
          <div className="flex items-center space-x-3">
            <SiShopware className="w-10 h-10 cursor-pointer object-contain md:left-10 md:top-6 z-10" />
            <span className="font-semibold text-xl">MiniShop</span>
          </div>
          <div className="p-5 flex flex-col items-center space-y-10">
            <h1 className="text-4xl font-semibold">Sign in</h1>
            <div className="space-y-4">
              <label className="inline-block w-full">
                <input
                  type="text"
                  placeholder="Email"
                  className="input w-full h-10 p-3 outline-none text-md rounded-sm"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="p-1 text-[13px] font-light  text-orange-500">
                    Please enter a valid email.
                  </p>
                )}
              </label>
              <label className="inline-block w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className="input w-full h-10 p-3 outline-none text-md rounded-sm"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="p-1 text-[13px] font-light  text-orange-500">
                    Your password must contain between 4 and 60 characters.
                  </p>
                )}
              </label>
            </div>

            <button className="w-full rounded bg-[#e50914] py-3 font-semibold">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;