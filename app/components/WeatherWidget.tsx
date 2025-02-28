"use client";
import { useState } from "react";

export default function WeatherWidget() {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
   
    const fetchWeather = async () => {
        if (!location) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/weather?location=${location}`);
            const data = await res.json();
            if (data.error) {
                alert("Error: " + data.error);
                setWeather(null);
            } else {
                setWeather(data);
            }
        } catch (error) {
            alert("Failed to fetch weather data.");
        }
        setLoading(false);
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-xl w-80 mx-auto">
            <h2 className="text-lg font-semibold mb-3">Check Weather</h2>
            <input
                type="text"
                placeholder="Enter City Name"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
            <button
                onClick={fetchWeather}
                className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
            >
                {loading ? "Loading..." : "Get Weather"}
            </button>

            {weather && (
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h3>
                    <p className="text-lg">{weather.weather[0].description}</p>
                    <p className="text-2xl font-bold">{weather.main.temp}°C</p>
                </div>
            )}
        </div>
    );
}
