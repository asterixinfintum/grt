require("dotenv").config();
import "regenerator-runtime/runtime.js";
import express from "express";
import http from "http";
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

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
  const file = path.join(publicDirectoryPath, 'download', 'Uvot.exe'); // Path to the file
  res.download(file); // Set disposition and send it.
});

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
