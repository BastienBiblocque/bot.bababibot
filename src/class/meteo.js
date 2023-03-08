const axios = require("axios");

class Meteo {
    async getWeather(city) {
        try {
            return axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${process.env.OPENWEATHER_KEY}&units=metric`,
            ).then((response) => {
                return response.data;
            });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Meteo;