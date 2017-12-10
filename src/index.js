const express = require('express')
const app = express()
const Realm = require("realm")

const DHT22ValueSchema = {
	name: "DHT22Value",
	properties: {
	  	sensor:  "string",
		temperature: "double",
		humidity: "double",
		timestamp: "double"
	}
};

let realm = new Realm({path:"./dht22Data/dht22.realm", schema: [DHT22ValueSchema]});

app.get('/dht22/values', function(req, res) {
	let values = realm.objects('DHT22Value');
	let sortedValues = values.sorted('timestamp', true);
	var valueArray = [];
	sortedValues.forEach(function(value, index) {
		valueArray.push(value);
	});
	res.status(200).json(valueArray);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))