"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/app/components/common/Footer";
import Project from "@/app/components/common/Projects";
import StayEngaged from "@/app/components/common/StayEngaged";
import WorkCard from "@/app/components/common/WorkCard";
import transition from "@/app/components/custom/Transition";
import Image from "next/image";

function Page() {
  const { scrollY } = useScroll();
  // Adjust the opacity range to go from 1 to 0.2
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <>
      <div className="relative w-full flex flex-col justify-center items-center mx-auto">
        <div className="sticky w-11/12 top-0 py-20 pt-36 pb-24 max-sm:w-full flex max-sm:items-center max-sm:justify-center">
          <motion.div style={{ opacity }}>
            <Image
              src={"/work/work.svg"}
              height={500}
              width={500}
              className="w-full max-sm:w-[400px] max-sm:px-4"
              alt="work"
            />
          </motion.div>
        </div>
        <div className="w-11/12 mb-16 z-20 -mt-10 relative">
          <WorkCard />
        </div>
      </div>

      <Project />
      <StayEngaged />

      <hr className="w-full border-t border-zinc-800" />
      <Footer />
    </>
  );
}

export default transition(Page);
