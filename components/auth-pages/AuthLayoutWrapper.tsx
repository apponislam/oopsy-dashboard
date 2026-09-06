"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthLayoutWrapperProps {
  children: ReactNode;
}

export function AuthLayoutWrapper({ children }: AuthLayoutWrapperProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-black">
      {/* Top on mobile (h-80 sm:h-95), Left 55% on desktop: Background Image & Absolute Overlay Content */}
      <div className="relative w-full h-80 sm:h-95 lg:h-full lg:w-[55%] lg:min-h-screen shrink-0 overflow-hidden">
        <Image
          src="/oopsy-bg.png"
          alt="Oopsy background"
          fill
          priority
          className="object-cover object-left"
        />

        {/* Logo Badge (top left) */}
        <Link
          href="/auth/login"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-opacity"
        >
          <Image src="/auth/icon1.svg" alt="Oopsy logo" width={22} height={10} />
          <span>OOPSY</span>
        </Link>

        {/* Clean Spaces Slogan Badge (top right) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-20 z-20 flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm">
          <span>
            Clean Spaces, <br />
            {"  "} Better Places
          </span>
          <Image src="/auth/icon2.svg" alt="Oopsy logo" width={22} height={10} />
        </div>

        {/* Heading & Subtitle (absolute top) */}
        <div className="absolute top-16 left-4 right-4 sm:top-25 sm:left-20 sm:right-10 z-20 flex flex-col gap-1 sm:gap-2 text-[#1A565D]">
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-[#005461]">
            Comfort & Convenience,
          </h1>
          <p className="text-xs sm:text-base lg:text-xl font-light tracking-tight text-[#005461]">
            Anywhere. Find clean restrooms, showers, and luggage storage near you — instantly.
          </p>
        </div>

        {/* 4 Feature Cards (flex-wrap on mobile, vertical flex-col on desktop) */}
        <div className="absolute bottom-6 left-4 sm:bottom-32 sm:left-20 z-20 flex flex-wrap lg:flex-col gap-2 sm:gap-4">
          <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm w-fit">
            <Image src="/auth/icon3.svg" alt="Storage icon" width={18} height={18} />
            <span>Storage</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm w-fit">
            <Image src="/auth/icon4.svg" alt="Restrooms icon" width={18} height={18} />
            <span>Restrooms</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm w-fit">
            <Image src="/auth/icon5.svg" alt="Lockers icon" width={18} height={18} />
            <span>Lockers</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFFFFB2] backdrop-blur-sm text-[#1A565D] py-1.5 sm:py-2 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm shadow-sm w-fit">
            <Image src="/auth/icon6.svg" alt="Showers icon" width={18} height={18} />
            <span>Showers</span>
          </div>
        </div>

        {/* Linear gradient overlay with specified color stops */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 79, 92, 0.55) 0%, rgba(8, 79, 92, 0.20) 20%, rgba(8, 79, 92, 0.85) 85%, rgba(6, 58, 69, 0.91) 91%, #042830 100%)",
          }}
        />
      </div>

      {/* Form Section Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-10 lg:p-16 bg-[#E2EFF1] rounded-t-[40px] rounded-b-none lg:rounded-l-[40px] lg:rounded-tr-none lg:-ml-10 -mt-10 lg:mt-0 min-h-[calc(100vh-14rem)] lg:min-h-screen">
        {children}
      </div>
    </div>
  );
}
