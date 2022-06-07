const request = require("request")

const forecast = function (lati, longi, callback) {
	const url =
		"http://api.weatherstack.com/current?access_key=6b12d8151e918b364ebd180375775710&query=" +
		lati +
		"," +
		longi

	request({ url, json: true }, function (error, { body }) {
		if (error) {
			callback("unable to get response", undefined)
		} else if (body.error) {
			callback("can not find location", undefined)
		} else {
			callback(undefined, {
				// country: body.location.country,
				// region: body.location.region,
				temp: body.current.temperature,
				temp_feelslike: body.current.feelslike,
				weather_desc: body.current.weather_descriptions[0],
			})
		}
	})
}

module.exports = forecast
