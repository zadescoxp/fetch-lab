import Button from "@/app/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Project() {
  return (
    <div className=" flex items-center w-full justify-center py-7">
      <div className=" bg-cuPurple font-extrabold text-8xl max-sm:text-6xl rounded-3xl text-white w-11/12 flex-col flex text-center justify-center items-center h-[380px] max-sm:h-[280px] leading-ms tracking-ms">
        <div className=" relative w-fit">
          Got a project
          <Image
            src={"/project/laptop.svg"}
            height={70}
            width={70}
            alt="thinking"
            className=" absolute top-7 -left-[5rem] max-sm:left-0 max-sm:-top-[6rem] max-sm:h-[50px] -rotate-12"
          />
          <Image
            src={"/project/cloud.svg"}
            height={60}
            width={60}
            alt="thinking"
            className=" absolute top-16 -right-20 max-sm:-top-[4rem] max-sm:right-0 max-sm:h-[50px] -rotate-12"
          />
        </div>
        <div className=" -mt-2 relative w-fit">
          in mind
          <Image
            src={"/project/up.svg"}
            height={60}
            width={60}
            alt="thinking"
            className=" absolute top-7 -left-[4.5rem] max-sm:-bottom-[4rem] max-sm:right-0 max-sm:h-[50px] -rotate-12"
          />
          <Image
            src={"/project/thinking.svg"}
            height={60}
            width={60}
            alt="thinking"
            className=" absolute top-7 -right-[4.5rem] max-sm:top-[2rem] max-sm:-right-[4rem] max-sm:h-[50px] -rotate-12 z-10"
          />
        </div>
        <div className=" -mt-12 relative w-fit">
          <motion.div
            whileHover={{
              transition: { duration: 0.25 },
              rotate: [0, 4, -4, 4, -4, 0],
              transformOrigin: "100% 100% 100% 100%",
            }}
          >
            <Button
              className=" relative text-4xl leading-ms tracking-ms -rotate-6 hover:bg-cuGreen border-none text-black p-3 px-7 hover:text-black max-sm:top-[2.5rem]"
              variant="cuGreen"
            >
              Let&apos;s Connect
            </Button>
          </motion.div>
          <Image
            src={"/project/smart.svg"}
            height={55}
            width={55}
            alt="thinking"
            className=" absolute -bottom-9 left-1/2 max-sm:-bottom-[6rem] max-sm:left-[6rem] max-sm:h-[50px]"
          />
        </div>
      </div>
    </div>
  );
}
