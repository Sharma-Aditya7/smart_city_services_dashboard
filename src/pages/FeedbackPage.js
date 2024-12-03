import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch feedback from the backend
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(response.data);
    } catch (err) {
      setError("Failed to fetch feedback. Please try again.");
    }
  };

  // Submit feedback to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFeedback = { name, email, message };
      await axios.post("http://localhost:5000/api/feedback", newFeedback);
      setSuccess(true);
      setError("");
      setName("");
      setEmail("");
      setMessage("");
      fetchFeedbacks(); // Refresh feedback list
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
      setSuccess(false);
    }
  };

  // Fetch feedback on component mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback</h1>

        {/* Error or Success Messages */}
        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mb-4">
            Your feedback has been submitted successfully!
          </p>
        )}

        {/* Feedback Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Submit Your Feedback
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
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
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Feedback
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Feedback List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            User Feedback
          </h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-600">No feedback yet. Be the first to leave feedback!</p>
          ) : (
            <ul className="space-y-4">
              {feedbacks.map((feedback) => (
                <li key={feedback._id} className="border-b pb-4">
                  <p className="font-semibold text-gray-800">{feedback.name}</p>
                  <p className="text-gray-600 text-sm">{feedback.email}</p>
                  <p className="text-gray-700 mt-2">{feedback.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage;