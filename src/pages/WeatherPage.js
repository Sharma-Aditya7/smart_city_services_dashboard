import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("metric"); // Default: Celsius
  const [error, setError] = useState("");

  const apiKey = "dcf5f67bd376329b1c1057571dfbb4ad";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

  const fetchWeather = async () => {
    try {
      // Fetch current weather
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: unit,
        },
      });
      setWeather(response.data);
      setError(""); // Clear any previous errors
      fetchForecast(); // Fetch the forecast
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get(forecastUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: unit,
        },
      });
      setForecast(response.data.list.slice(0, 5)); // Get 5 forecasts
    } catch (err) {
      console.error(err);
    }
  };

  const getBackgroundClass = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "bg-blue-300"; // Sunny
      case "Clouds":
        return "bg-gray-300"; // Cloudy
      case "Rain":
      case "Drizzle":
        return "bg-blue-500"; // Rainy
      case "Snow":
        return "bg-gray-100"; // Snowy
      case "Thunderstorm":
        return "bg-purple-600"; // Stormy
      default:
        return "bg-gray-100"; // Default
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Weather Updates
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search for Weather
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={fetchWeather}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <div className="mb-4 flex items-center space-x-4">
            <button
              onClick={() => setUnit("metric")}
              className={`px-4 py-2 rounded-lg ${
                unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              Celsius
            </button>
            <button
              onClick={() => setUnit("imperial")}
              className={`px-4 py-2 rounded-lg ${
                unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              Fahrenheit
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </div>

        {weather && (
          <div
            className={`shadow-lg rounded-lg p-6 ${
              weather ? getBackgroundClass(weather.weather[0].main) : "bg-white"
            }`}
          >
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex-grow">
                Weather in {weather.name}, {weather.sys.country}
              </h2>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-16 h-16"
              />
            </div>
            <p className="text-gray-600">
              <strong>Temperature:</strong> {weather.main.temp}°{
                unit === "metric" ? "C" : "F"
              }
            </p>
            <p className="text-gray-600">
              <strong>Feels Like:</strong> {weather.main.feels_like}°{
                unit === "metric" ? "C" : "F"
              }
            </p>
            <p className="text-gray-600">
              <strong>Min Temp:</strong> {weather.main.temp_min}°{
                unit === "metric" ? "C" : "F"
              }
            </p>
            <p className="text-gray-600">
              <strong>Max Temp:</strong> {weather.main.temp_max}°{
                unit === "metric" ? "C" : "F"
              }
            </p>
            <p className="text-gray-600">
              <strong>Humidity:</strong> {weather.main.humidity}%
            </p>
            <p className="text-gray-600">
              <strong>Wind Speed:</strong> {weather.wind.speed} m/s
            </p>
            <p className="text-gray-600">
              <strong>Description:</strong> {weather.weather[0].description}
            </p>
          </div>
        )}

{forecast.length > 0 && (
  <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">
      5-Day Forecast
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md"
        >
          <p className="font-bold text-gray-700">
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-16 h-16"
          />
          <p className="text-gray-600 text-sm capitalize">
            {day.weather[0].description}
          </p>
          <div className="flex space-x-2 mt-2">
            <p className="text-sm text-blue-600 font-semibold">
              {day.main.temp_min}°{unit === "metric" ? "C" : "F"}
            </p>
            <span className="text-gray-500">/</span>
            <p className="text-sm text-red-600 font-semibold">
              {day.main.temp_max}°{unit === "metric" ? "C" : "F"}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default WeatherPage;