import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Weather from "./Weather";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");
  const [inputError, setInputError] = useState();
  const [searchError, setSearchError] = useState();
  const [loading, setLoading] = useState(false);
  const [enter, setEnter] = useState(false);

  const enterPressed = (e) => {
    return e.code === "Enter" ? setEnter(true) : setEnter(false);
  };

  const checkWeather = (city, enter) => {
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: city, days: "3" },
      headers: {
        "X-RapidAPI-Key": "1df4868d6bmsh6ffab95196a6d0dp1c910fjsn2b769e28e3be",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    if (enter === true) {
      if (city.length === 0) {
        setInputError("Please enter a city");
        setSearchError();
      } else if (city.length < 3) {
        setInputError("City can not be less than 3 letters");
        setSearchError();
      } else {
        setLoading(true);
        axios
          .request(options)
          .then((response) => {
            setLoading(false);
            setData(response.data);
            setSearchError();
            setInputError();
            setCity("");
            setEnter(false);
          })
          .catch((error) => {
            setLoading(false);
            error.response
              ? setSearchError(`No city found with name "${city}"`)
              : setSearchError("Please check your internet connection");
            setInputError();
            setData();
          });
      }
    }
  };

  useEffect(() => {
    checkWeather(city, enter);
  }, [city, enter]);

  return (
    <div>
      <Weather
        data={data}
        loading={loading}
        inputError={inputError}
        setInputError={setInputError}
        searchError={searchError}
        setSearchError={setSearchError}
        setEnter={setEnter}
        city={city}
        setCity={setCity}
        enterPressed={enterPressed}
      />
    </div>
  );
}

export default App;
