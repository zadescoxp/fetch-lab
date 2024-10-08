"use client";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import { headerButtons } from "@/app/utils/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { MenuToggle } from "../ui/MenuToggle";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { at: "<" },
      ],
      ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { at: "<" },
      ],
      // ...menuAnimations
    ]);
  }, [isOpen]);

  return scope;
}

function Header() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextLink, setNextLink] = useState<string | null>(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavigate = useCallback((link: string) => {
    setNextLink(link); // Store the link to navigate
    setIsAnimating(true); // Start the animation
  }, []);

  // Handle the animation end and navigate
  const handleAnimationComplete = () => {
    if (nextLink) {
      window.location.href = nextLink;
      setNextLink(null); // Reset the link after navigation
    }
  };

  // Track scroll direction
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setShowHeader(false);
    } else {
      // Scrolling up
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const [isOpen, setIsOpen] = useState(false);

  const scope = useMenuAnimation(isOpen);

  return (
    <>
      {isAnimating && (
        <motion.div
          className="fixed top-0  left-0 z-50 w-screen h-screen bg-green-500"
          initial={{ scaleX: 0 }} // Start off-screen
          animate={{ scaleX: 1 }} // Slide in from the right
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }} // Ensure it scales from the right
          onAnimationComplete={handleAnimationComplete} // Trigger navigation after animation
        />
      )}

      <motion.header
        className={`flex z-40 fixed max-md:px-4 max-md:left-0 top-0 max-md:w-full w-11/12 py-9 items-center justify-between transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -100 }}
      >
        <div onClick={() => handleNavigate("/")}>
          <Image
            className="max-md:hidden"
            src={"/logos/Logo(White).svg"}
            alt="fetchLab logo"
            height={110}
            width={110}
          />
          <Image
            className="hidden max-md:inline-block"
            src={"/logos/Monogram(White).svg"}
            alt="fetchLab logo"
            height={30}
            width={30}
          />
        </div>
        <div className="flex max-md:hidden items-center justify-center gap-6">
          {headerButtons.map(({ title, variant, className, link }) => (
            <div onClick={() => handleNavigate(link)} key={title}>
              <Button
                className={className}
                variant={
                  variant as "cuYellow" | "cuRed" | "cuGreen" | "cuPurple"
                }
              >
                {title}
              </Button>
            </div>
          ))}
        </div>
        <div
          ref={scope}
          className="hidden max-md:flex items-center justify-center gap-6"
        >
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{
              top: "-100%",
            }}
            animate={{
              top: 0,
            }}
            exit={{
              top: "-100%",
            }}
            className="flex z-30 fixed bg-black flex-col h-screen w-screen items-center justify-center gap-y-10"
          >
            {headerButtons.map(({ title, variant, className, link }) => (
              <div onClick={() => handleNavigate(link)} key={title}>
                <Button
                  className={"text-2xl w-[250px]"}
                  variant={"cuGreen"}
                >
                  {title}
                </Button>
              </div>
            ))}
            <motion.div
              animate={{ y: [0, -7, 0] }} // Moves up by 20px and then down
              transition={{
                duration: 1, // Duration for one full cycle (up and down)
                repeat: Infinity, // Infinite loop
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-full flex justify-center items-center"
            >
              <Image
                src="/home/up.png"
                height={45}
                width={45}
                alt=""
                className="hand-emoji down"
              />
            </motion.div>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
