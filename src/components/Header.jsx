import React from 'react';
import { Link } from 'react-router-dom';
import { GiSoccerKick } from "react-icons/gi";
const Header = () => {
    return (
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow-md">
        <div className=" flex flex-wrap items-center justify-between  p-4">
          <Link to="/" className="flex items-center ml-2">
            <GiSoccerKick size={35}/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">VisualPass</span>
          </Link>
          
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 " >
            <li>
                <Link to="/top-leagues" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Top Leagues</Link>
            </li>
            <li>
                <Link to="/passing-simulator" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Passing Simulator</Link>
            </li>
            <li>
                <Link  to="/network-graph" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Passing Network</Link>
            </li>
            
            <li>
                <Link  to="/heatmap" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Passing HeatMap</Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
      
    );
};

export default Header;
