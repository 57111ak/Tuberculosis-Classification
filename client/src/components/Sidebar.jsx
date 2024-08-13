import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PicLeftOutlined, PieChartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs, faDatabase } from '@fortawesome/free-solid-svg-icons';
import AuthPopup from './AuthPopup';

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 z-50 text-gray-500 flex flex-col text-2xl">
      <div className="-ml-4">
        <h1 className="flex w-20 font-bold text-white rounded-lg bg-blue-900 p-2 text-xl">
          MER<span className=" text-yellow-500 inline-block">i</span>L
        </h1>
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white rounded-full" onClick={() => navigate('/xray')}>
        <PicLeftOutlined />
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white" onClick={() => navigate('/database')}>
        <PieChartOutlined />
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white" onClick={() => navigate('/database')}>
        <FontAwesomeIcon icon={faDatabase} />
      </div>
      <div className="mt-10 text-[5vh] hover:text-green-500 text-white" onClick={() => navigate('/xray')}>
        <FontAwesomeIcon icon={faLungs} />
      </div>
      <div className="mt-[36vh]">
        <AuthPopup />
      </div>
    </div>
  );
};
