import React from "react";
import { PicLeftOutlined, PieChartOutlined, CalendarOutlined  } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs,faDatabase } from '@fortawesome/free-solid-svg-icons';


export const Sidebar = () => {
  return (
    <div className="p-4 text-gray-500 flex flex-col text-2xl">
      <div className="-ml-4">
        <h1 className="flex w-20 font-bold text-white rounded-lg bg-blue-900 p-2 text-xl">
          MER<span className=" text-yellow-500 inline-block">i</span>L
        </h1>
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500  text-white rounded-full  ">
        <PicLeftOutlined />
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white ">
        <PieChartOutlined />
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white ">
      <FontAwesomeIcon icon={faDatabase} />
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white ">
      <FontAwesomeIcon icon={faLungs} />
      
      </div>
    </div>
  );
};
