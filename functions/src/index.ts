import * as functions from "firebase-functions";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.post('/', jsonParser, (req, res) => {
  const body = req.body;
  res.send('Hello World, from express! Request: ' + JSON.stringify(body.Timestamp));
});


// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
