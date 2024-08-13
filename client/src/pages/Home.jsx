import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Navbar from "../components/Navbar";
import BackgroundCanvas from "../components/BackgroundCanvas";
// import './styles.css'; // Ensure you import your stylesheet

const Home = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 10) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".04"
      className=" relative h-screen p-5 bg-gradient-to-b from-gray-700 via-black to-black no-scrollbar"
      
    >
      <Navbar />
      <div className="z-0 absolute ">

     <BackgroundCanvas/>
      </div>
      <div className="p-7 z-50 w-full flex flex-col">
        <div className="flex flex-col text-white">
          <h1 className="text-[3vw] font-bold uppercase m-auto mt-10">
            Welcome to Tuberculosis Classification
          </h1>
          
        </div>
        <button className="rounded-md text-xl cursor-pointer bg-green-800 mt-5 text-white w-[200px] py-2 m-auto">
          Getting Started
        </button>0
      </div>
      <div>
      <h3 className=" text-white text-xl w-1/2 leading-10 m-auto">
            Tuberculosis (TB) is a serious infectious disease that mainly
            affects the lungs. It is caused by bacteria called Mycobacterium
            tuberculosis. Our TB classification system aims to assist in the
            accurate detection and classification of TB to ensure timely and
            effective treatment.
          </h3>
      </div>
      <motion.div
        animate={{
          transition: { duration: 1 },
          x: 30,
          y: 100,
          scale: 1,
          rotate: 0,
        }}
        className="h-[20vh] w-[10vw] border-2 rounded-full"
      >
        <motion.div
          animate={{
            y: [0, 20, 0],
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
          className="w-0 h-0 m-auto  my-[40%] cursor-pointer"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: "20px solid white",
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
