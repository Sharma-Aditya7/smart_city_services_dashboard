import React, { useState } from "react";
import Navbar from "../components/Navbar";

const EmergencyPage = () => {
  // State for form inputs
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // List of emergency services
  const emergencyContacts = [
    { service: "Police", number: "100" },
    { service: "Fire Brigade", number: "101" },
    { service: "Ambulance", number: "102" },
    { service: "Disaster Management", number: "108" },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Clear form after submission
    setName("");
    setContact("");
    setDetails("");

    // Reset submission state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Emergency Services
        </h1>

        {/* Emergency Contact List */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Emergency Contact Numbers
          </h2>
          <ul className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="font-semibold text-gray-700">
                  {contact.service}
                </span>
                <span className="text-gray-500">{contact.number}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency Report Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Report an Emergency
          </h2>
          {submitted && (
            <p className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">
              Your emergency report has been submitted successfully!
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="contact">
                Contact Information
              </label>
              <input
                id="contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="details">
                Emergency Details
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;