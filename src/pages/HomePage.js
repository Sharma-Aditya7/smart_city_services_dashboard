import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  const stats = {
    totalParkingSpots: 120,
    availableParkingSpots: 45,
    totalFeedbacks: 32,
    binsScheduledForPickup: 10,
  };

  const services = [
    { name: "Parking Management", link: "/parking", icon: "🚗" },
    { name: "Weather Updates", link: "/weather", icon: "☀️" },
    { name: "Garbage Collection", link: "/garbage", icon: "🗑️" },
    { name: "Emergency Services", link: "/emergency", icon: "🚨" },
    { name: "Feedback", link: "/feedback", icon: "💬" },
    { name: "Statistics", link: "/statistics", icon: "📊" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Welcome to the Smart City Dashboard
        </h1>

        {/* Statistics Widget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Total Parking Spots
            </h2>
            <p className="text-2xl font-bold text-blue-600 mt-4">
              {stats.totalParkingSpots}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Available Parking Spots
            </h2>
            <p className="text-2xl font-bold text-green-600 mt-4">
              {stats.availableParkingSpots}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Total Feedbacks
            </h2>
            <p className="text-2xl font-bold text-yellow-600 mt-4">
              {stats.totalFeedbacks}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Bins Scheduled for Pickup
            </h2>
            <p className="text-2xl font-bold text-red-600 mt-4">
              {stats.binsScheduledForPickup}
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">
                {service.name}
              </h2>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;