import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const StatisticsPage = () => {
  const stats = {
    totalParkingSpots: 120,
    availableParkingSpots: 45,
    totalFeedbacks: 32,
    totalBins: 50,
    binsScheduledForPickup: 10,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Parking Spots
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-4">
              {stats.totalParkingSpots}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Parking Spots
            </h2>
            <p className="text-3xl font-bold text-green-600 mt-4">
              {stats.availableParkingSpots}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Feedbacks
            </h2>
            <p className="text-3xl font-bold text-yellow-600 mt-4">
              {stats.totalFeedbacks}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Garbage Bins
            </h2>
            <p className="text-3xl font-bold text-purple-600 mt-4">
              {stats.totalBins}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Bins Scheduled for Pickup
            </h2>
            <p className="text-3xl font-bold text-red-600 mt-4">
              {stats.binsScheduledForPickup}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatisticsPage;