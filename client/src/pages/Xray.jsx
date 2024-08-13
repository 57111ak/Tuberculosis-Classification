import React from "react";
import BackgroundCanvas from "../components/BackgroundCanvas";
import ImageUploader from "../components/ImageUploader";
import { Sidebar } from "../components/Sidebar";

export const Xray = () => {
  return (
    <div className="bg-black flex p-10  w-full h-screen">
      <div className="w-1/12">
        <Sidebar />
      </div>
      <div className=" px-10 py-5 text-white w-11/12">
        <h1 className="text-3xl font-bold mb-7">
          Uplaod your X-ray to check the Tuberculosis{" "}
        </h1>
         
        <div className=" flex  gap-[30vw]">
          <div>
            <ImageUploader />
          </div>

          <div className="flex flex-col  w-1/3">
            <div>
              <textarea
                name="text"
                className="text-black rounded-xl text-xl focus:outline-none"
                cols={50}
                rows={10}
                id=""
              ></textarea>
            </div>

            <div>
              <button className="bg-green-800 w-  p-4 rounded-xl" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
