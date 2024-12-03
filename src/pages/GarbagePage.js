import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const GarbagePage = () => {
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState("");
  const [newStatus, setNewStatus] = useState("Empty");
  const [error, setError] = useState("");

  // Fetch garbage bins from the backend
  const fetchBins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/garbage");
      setBins(response.data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch garbage bins. Please try again.");
    }
  };

  // Update bin status in the backend
  const handleUpdateStatus = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/garbage/${selectedBin}`, {
        status: newStatus,
      });
      fetchBins(); // Refresh bins after updating
    } catch (err) {
      setError("Failed to update garbage bin status. Please try again.");
    }

    // Reset form
    setSelectedBin("");
    setNewStatus("Empty");
  };

  // Fetch bins on component mount
  useEffect(() => {
    fetchBins();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Garbage Collection Management
        </h1>

        {/* Error Message */}
        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Table displaying bins */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Bin ID</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bins.map((bin) => (
                <tr key={bin._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{bin.binId}</td>
                  <td className="px-4 py-2">{bin.location}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      bin.status === "Full"
                        ? "text-red-600"
                        : bin.status === "Empty"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {bin.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form to update bin status */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Bin Status
          </h2>
          <form onSubmit={handleUpdateStatus}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="bin">
                Select Bin ID:
              </label>
              <select
                id="bin"
                value={selectedBin}
                onChange={(e) => setSelectedBin(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">-- Select a Bin --</option>
                {bins.map((bin) => (
                  <option key={bin._id} value={bin._id}>
                    {bin.binId} - {bin.location}
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
                <option value="Empty">Empty</option>
                <option value="Full">Full</option>
                <option value="Scheduled for Pickup">Scheduled for Pickup</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Status
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GarbagePage;