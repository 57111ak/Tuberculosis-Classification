import React from "react";
import Data from "../components/Data";
import DashNav from "../components/DashNav";
import BackgroundCanvas from "../components/BackgroundCanvas";
import { Sidebar } from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen bg-black p-6  w-full gap-4 flex flex-row">
      <div className="z-0 absolute ">
        <BackgroundCanvas />
      </div>

      <Sidebar />
      <div className="w-11/12 ">
        <DashNav />
        <Data />
      </div>
    </div>
  );
};

export default Dashboard;
