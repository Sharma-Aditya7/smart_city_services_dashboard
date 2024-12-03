import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-bold">Smart City Dashboard</div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/parking" className="hover:underline">
            Parking
          </Link>
        </li>
        <li>
          <Link to="/weather" className="hover:underline">
            Weather
          </Link>
        </li>
        <li>
          <Link to="/garbage" className="hover:underline">
            Garbage
          </Link>
        </li>
        <li>
          <Link to="/statistics" className="hover:underline">
            Statistics
          </Link>
        </li>
        <li>
          <Link to="/emergency" className="hover:underline">
            Emergency
          </Link>
        </li>
        <li>
          <Link to="/feedback" className="hover:underline">
            Feedback
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;