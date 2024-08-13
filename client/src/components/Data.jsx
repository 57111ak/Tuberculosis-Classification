import React from "react";
import ShowOldData from "./ShowOldData";
import Graph from "./Graph";

const Data = () => {
  return (
    <div className="flex   flex-col w-11/12  text-white mt-4 rounded-2xl m-auto h-[80vh] p-5">
      <div className="flex flex-row gap-6 w-11/12  ">
        <ShowOldData />
        <ShowOldData />
        <ShowOldData />
      </div>
      <div className="mt-10  w-full  ">
        <div className=" flex text-sm  gap-7 flex-row w-full">
          <div className=" flex flex-row gap-1">
            <div className=" p-1 w-1 rounded-full bg-[#29c26b]"></div>
            <h1>Normal report</h1>
          </div>
          <div className=" flex flex-row gap-1">
            <div className=" p-1 w-1 rounded-full bg-[#FFCD56]"></div>
            <h1>In progress report</h1>
          </div>
          <div className=" flex flex-row gap-1">
            <div className=" p-1 w-1 rounded-full bg-[#a91717]"></div>
            <h1>Postive report</h1>
          </div>
        </div>
        <div className="w-full justify-between flex flex-row ">
          <div className="  ml-10 mt-4 w-[15vw] ">
            <Graph />
          </div>

          <video
        playsInline
        src="https://www.shutterstock.com/shutterstock/videos/3451542079/preview/stock-footage--d-animation-illustrating-human-respiratory-system-with-transparent-body-lungs-and-highlighted.webm"
        className="w-1/2"
        loop
        autoPlay

        
        ></video>
        </div>
      </div>
    </div>
  );
};

export default Data;
