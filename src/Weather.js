import React from "react";
import { GiCancel } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";

function Weather({
  loading,
  data,
  city,
  setCity,
  inputError,
  setInputError,
  searchError,
  setSearchError,
  enterPressed,
}) {
  return (
    <div>
      <div className="app py-4">
        <div className="container">
          <input
            type="text"
            placeholder="Enter a city name"
            className="search-bar"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={enterPressed}
          />

          <br />

          {/* INPUT ERROR MESSAGE */}
          {inputError ? (
            <div className="d-flex justify-content-between input-error align-items-center">
              <div>{inputError}</div>
              <div className="input-icon me-2">
                <GiCancel onClick={() => setInputError()} />
              </div>
            </div>
          ) : null}

          {/* SEARCHING DIV */}
          {loading ? (
            <div className="mid container">
              <div
                className="spinner-border mb-1"
                style={{ width: "2rem", height: "2rem" }}
                role="status"
              ></div>
              <h4>Searching...</h4>
            </div>
          ) : // WEATHER DATA
          data ? (
            <div className="mt-3">
              <div className="location">
                <p>{data.location.name}</p>
              </div>
              <small>
                {data.location.region}, {data.location.country}
              </small>
              <h1>{Math.round(data.current.temp_c)}°C</h1>
              <p>{data.current.condition.text}</p>

              {/* 3 DAYS FORECAST */}
              <div className="my-container my-3">
                {data.forecast.forecastday.map((day, i) => {
                  const date = new Date(day.date);
                  const today = new Date();
                  const weekday = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];

                  return (
                    <div className="d-flex justify-content-between " key={i}>
                      <p>
                        {today.getDay() === date.getDay()
                          ? "Today"
                          : today.getDay() + 1 === date.getDay()
                          ? "Tomorrow"
                          : weekday[date.getDay()]}{" "}
                      </p>
                      <p>
                        {Math.round(day.day.maxtemp_c)}°{"/ "}
                        {Math.round(day.day.mintemp_c)}°
                      </p>
                    </div>
                  );
                })}
              </div>
              <div>
                {/* HOURLY FORECAST DATA*/}
                <div className="container-fluid d-flex justify-content-between hourly-forecast py-3">
                  {data.forecast.forecastday[0].hour.map((hour, i) => {
                    var time = hour.time.split(" ")[1];
                    return (
                      <div key={i} className="text-center me-3">
                        <small>{time}</small>
                        <p>{Math.round(hour.temp_c)}°</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OTHER DETAILS */}
              <div className="d-flex justify-content-between my-container mt-4">
                <div>
                  <small>Feels like</small>
                  <p>{Math.round(data.current.feelslike_c)}°C</p>
                </div>

                <div>
                  <small>Humidity</small>
                  <p>{data.current.humidity}%</p>
                </div>

                <div>
                  <small>UV index</small>
                  <p>{data.current.uv}</p>
                </div>

                <div>
                  <small>Visibility</small>
                  <p>{data.current.vis_km}km</p>
                </div>
              </div>
            </div>
          ) : // CITY NOT FOUND ERROR
          searchError ? (
            <div className="mid container">
              <div>
                <GiCancel
                  className="input-icon"
                  onClick={() => setSearchError()}
                />
              </div>
              <h4>{searchError}</h4>
            </div>
          ) : (
            //ABOUT
            <div className="mid container">
              <TiWeatherPartlySunny style={{fontSize: '2rem'}}/>
              <h2>Weather by Bilal</h2>
              <h6>
                Developed by&nbsp;
                <a
                  href="https://bilalhassan.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bilal Hassan
                </a>
              </h6>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer">
      Copyright © 2023&nbsp;
        <a
          href="https://bilalhassan.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bilal Hassan
        </a>
      </div>
    </div>
  );
}

export default Weather;
