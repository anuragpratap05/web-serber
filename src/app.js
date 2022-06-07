const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()

const public_path = path.join(__dirname, "../public")
const view_path = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", view_path)
hbs.registerPartials(partialpath)

app.use(express.static(public_path))
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")
app.get("/", function (req, res) {
	res.render("index", { title: "Weather App", name: "Anurag singh" })
})

app.get("/about", function (req, res) {
	res.render("about", { title: "About Me", name: "Anurag singh" })
})

app.get("/help", function (req, res) {
	res.render("help", {
		title: "Help",
		help_msg: "what do u wann help with",
		name: "Anurag singh",
	})
})

app.get("/weather", function (req, res) {
	// console.log()
	const address = req.query.address
	if (!address) {
		return res.send({
			error: "pls provide address",
		})
	}
	geocode(
		address,
		function (error, { lat, long, country, region, county } = {}) {
			if (error) {
				return res.send({
					error: error,
				})
			}

			forecast(
				lat,
				long,
				(error, { temp, temp_feelslike, weather_desc }) => {
					if (error) {
						return res.send({
							error: error,
						})
					}
					return res.send({
						location: county + ", " + region + ", " + country,
						// city: county,
						// state: region,

						// country: country,
						forecast:
							"Current temperature is " +
							temp +
							" and it feels like " +
							temp_feelslike +
							" status is " +
							weather_desc,
						// temperature: temp,
						// feels_like: temp_feelslike,
						// Description: weather_desc,
					})
				}
			)
		}
	)
	// res.send({
	// 	location: req.query.address,
	// 	weather: "cloudy",
	// 	name: "Anurag singh",
	// })
})
app.get("/help/*", function (req, res) {
	const msg = "help page not found"
	res.render("error", {
		title: msg,
	})
})
app.get("*", function (req, res) {
	const msg = "page not found"
	res.render("error", {
		title: msg,
	})
})

app.listen(3000, function () {
	console.log("listening")
})
