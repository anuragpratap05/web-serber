console.log("client side js file is loaded")

// fetch("http://puzzle.mead.io/puzzle").then(function (response) {
// 	response.json().then(function (data) {
// 		console.log(data)
// 	})
// })

const weather_form = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#msg1")
const message2 = document.querySelector("#msg2")
// const msg2 = document.querySelector("#msg2")
// message.textContent = "from js"
weather_form.addEventListener("submit", (e) => {
	e.preventDefault()
	const loc = search.value
	message1.textContent = "Loading..."
	message2.textContent = ""
	fetch("/weather?address=" + loc).then(function (response) {
		response.json().then(function (data) {
			if (data.error) {
				message1.textContent = data.error
				message2.textContent = " "
			} else {
				message1.textContent = data.location
				message2.textContent = data.forecast
			}
		})
	})
})
