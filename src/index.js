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
	let valueArray = valuesFromRealm(100);
	res.status(200).json(valueArray);
});

app.get('/dht22/values/:count', function(req, res) {
	var countStr = req.params.count;
	var count = 100;
	try {
		count = parseInt(countStr);
	}
	catch {
		res.status(400);
	}
	let valueArray = valuesFromRealm(count);
	res.status(200).json(valueArray);
});


app.listen(3000, '0.0.0.0');


function valuesFromRealm(count) {
	let values = realm.objects('DHT22Value');
	let sortedValues = values.sorted('timestamp', true);
	let limitedValues = sortedValues.slice(0, 100);
	var valueArray = [];
	limitedValues.forEach(function(value, index) {
		valueArray.push(value);
	});
	return valueArray;
}