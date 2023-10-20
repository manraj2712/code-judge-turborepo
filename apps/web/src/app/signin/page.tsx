"use client";
import Link from "next/link";
import Image from "next/image";
import bg from "@/../public/images/login-bg-1.jpg";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // signin with credentials provider
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };
  return (
    <section className="h-[calc(100vh-64px)] flex flex-col md:flex-row items-center">
      {/* side image */}
      <div className="hidden md:block w-full xl:w-2/3 2xl:w-10/12 h-full">
        <Image src={bg} alt="bg" className="w-full h-full object-cover" />
      </div>
      {/* form  */}

      <div
        className="bg-neutral-900 w-full md:mx-0 xl:w-1/3 h-full px-6 md:px-10 lg:px-16 xl:px-12
          flex justify-center overflow-y-auto"
      >
        <div className="w-full pt-12">
          <h1 className="text-white text-xl md:text-2xl font-bold leading-tight">
            Sign in to your account
          </h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-200 text-sm" htmlFor="email">
                Email Address
              </label>
              <input
                autoFocus
                autoComplete="email"
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="text-black text-sm w-full py-2 px-4 sm:py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-200 text-sm" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                className="text-black text-sm w-full px-4 py-2 sm:py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="mr-1 text-sm font-semibold text-gray-200 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="text-sm w-full block bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white font-semibold rounded-lg
                px-4 py-2 sm:py-3 mt-6"
            >
              Sign in
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="text-base w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 sm py-2 sm:py-3 border border-gray-300"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
              })
            }
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 48 48"
                height={24}
                width={24}
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <span className="ml-4 text-sm">Sign in with Google</span>
            </div>
          </button>
          <p className="ml-1 mt-8 text-white text-sm">
            Need an account?
            <a
              href="#"
              className="ml-2 text-blue-500 hover:text-blue-700 font-semibold text-sm"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
