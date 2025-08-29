require("dotenv").config();
import "regenerator-runtime/runtime.js";
import express from "express";
import http from "http";
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from "fs";

import mongoose from 'mongoose';

import routes from './routes/1_index';

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

const publicDirectoryPath = path.resolve(__dirname, '../public');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type']
};

app.use(cors(corsOptions));

app.use(express.static('public'));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/wallet/download', (req, res) => {
  const file = path.join(publicDirectoryPath, 'download', 'Cronox Wallet.exe'); // Path to the file
  res.download(file); 
});

app.get('/update/note/download', (req, res) => {
  try {
    const randomString = generateRandomString(35);
    const fileName = `cronox_update_cypher_${Date.now()}.md`;
    
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'text/plain');
    
    res.send(randomString);
    
  } catch (error) {
    console.error('Error generating download:', error);
    res.status(500).send('Error generating download file');
  }
});

function generateRandomString(length = 15) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const {
  bitcoinRoute,
  sendRoute,
  adminRoute,
  authRoute,
  dashBoardRoute
} = routes;

app.use(bitcoinRoute);
app.use(sendRoute);
app.use(adminRoute);
app.use(authRoute);
app.use(dashBoardRoute);

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to database');

  server.listen(PORT, async (error) => {
    if (error) {
      return error;
    }

    return console.log(`server started on port here now ${PORT}`);
  });
});
