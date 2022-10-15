import * as functions from "firebase-functions";

import * as express from "express";

import * as bodyParser from "body-parser";

import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

const app = express();
const jsonParser = bodyParser.json();
admin.initializeApp();


app.post("/", jsonParser, async (req, res) => {
  const body = req.body;

  const writeResult = await admin.firestore().collection("messages")
      .add({body: body, timestamp: Timestamp.now()});

  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
  // res.send(`Message with ID: ${writeResult.id} added.`);
});


// Expose Express API as a single Cloud Function:
exports.postMessage = functions.region("europe-west1").https.onRequest(app);
