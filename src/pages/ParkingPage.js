import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ParkingPage = () => {
  // Mock data for parking spots
  const [parkingSpots, setParkingSpots] = useState([
    { id: 1, location: "Zone A1", status: "Available" },
    { id: 2, location: "Zone A2", status: "Occupied" },
    { id: 3, location: "Zone B1", status: "Available" },
    { id: 4, location: "Zone B2", status: "Occupied" },
    { id: 5, location: "Zone C1", status: "Available" },
  ]);

  // State for form inputs
  const [selectedSpot, setSelectedSpot] = useState("");
  const [newStatus, setNewStatus] = useState("Available");

  // Handle form submission
  const handleUpdateStatus = (e) => {
    e.preventDefault();

    // Update the parking spot status
    setParkingSpots((prevSpots) =>
      prevSpots.map((spot) =>
        spot.id === parseInt(selectedSpot)
          ? { ...spot, status: newStatus }
          : spot
      )
    );

    // Reset form
    setSelectedSpot("");
    setNewStatus("Available");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Parking Management</h1>
      </header>
      <main className="py-10 px-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Parking Spot Availability
        </h2>
        <div className="overflow-x-auto mb-10">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Spot ID</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {parkingSpots.map((spot) => (
                <tr key={spot.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{spot.id}</td>
                  <td className="px-4 py-2">{spot.location}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      spot.status === "Available"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {spot.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form
          onSubmit={handleUpdateStatus}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Update Parking Spot Status
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="spot">
              Select Spot ID:
            </label>
            <select
              id="spot"
              value={selectedSpot}
              onChange={(e) => setSelectedSpot(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">-- Select a Spot --</option>
              {parkingSpots.map((spot) => (
                <option key={spot.id} value={spot.id}>
                  {spot.id} - {spot.location}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="status">
              New Status:
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Status
          </button>
        </form>
      </main>
    </div>
  );
};

export default ParkingPage;