import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "5908beecfc994c5bb3193704242505",
            q: city,
          },
        }
      );
      setData(res.data);
      setCity("");
    } catch (error) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div style={{ marginLeft: "33rem" }}>
        <input
          type="text"
          placeholder="Enter city name"
          style={{ padding: "5px" }}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "#24eb24",
            border: "none",
            borderRadius: "5px",
            padding: "8px",
          }}
          onClick={handleSubmit}
        >
          Search
        </button>
        {loading && <p>Loading data...</p>}
      </div>
      <div className="weather-cards">
        {data && (
          <>
            <div className="weather-card">
              <h2>Temperature</h2>
              <p>{data.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h2>Humidity</h2>
              <p>{data.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h2>Condition</h2>
              <p>{data.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h2>Wind Speed</h2>
              <p>{data.current.wind_kph} kph</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
