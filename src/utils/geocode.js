const request = require("request")

const geocode = function (address, callback) {
	const url =
		"http://api.positionstack.com/v1/forward?access_key=421ebe2c18ede1ee3973d4e4a5ad19ab&query=" +
		encodeURIComponent(address) +
		"&limit=1"
	request({ url, json: true }, function (error, { body }) {
		if (error) {
			callback("unable to get response", undefined)
		} else if (body.error) {
			callback("can not find location", undefined)
		} else if (body.data.length === 0) {
			callback("try another address", undefined)
		} else {
			callback(undefined, {
				lat: body.data[0].latitude,
				long: body.data[0].longitude,
				country: body.data[0].country,
				region: body.data[0].region,
				county: body.data[0].county,
			})
		}
		// console.log(body.data[0])
		// console.log(data)
	})
}
module.exports = geocode
