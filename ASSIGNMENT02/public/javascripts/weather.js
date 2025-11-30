const axios = require('axios');
async function getWeather(city, country) {
  try {
    const apiKey = process.env.OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      city: data.name
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

module.exports = { getWeather };