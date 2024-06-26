"use client";
import VideoThumb from "@/../public/images/hero-image.png";
import ModalVideo from "@/components/home/modal-video";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const { data } = useSession();
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-24 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Unlock the Enigma of{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Code
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="sm:text-xl text-base text-gray-200 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Embark on a Brain-Teasing Journey to Master Coding Challenges
                and Problem-Solving Skills.
              </p>
              <div
                className=" mx-auto flex gap-5 justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <button
                  onClick={() => {
                    router.push("/explore");
                  }}
                  className="cta-button-primary"
                >
                  Explore
                </button>
                <button
                  onClick={() => {
                    router.push(data?.user ? "/profile/my-profile" : "/signin");
                  }}
                  className="cta-button-gray"
                >
                  {data?.user ? "Profile" : "Sign up"}
                </button>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080}
          />
        </div>
      </div>
    </section>
  );
}
