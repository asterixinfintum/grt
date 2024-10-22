require('dotenv').config();

import "regenerator-runtime/runtime.js";
import express from 'express';
import http from "http";
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/wallet', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'wallet.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

const PORT = process.env.PORT || 8081;
const server = http.createServer(app);

server.listen(PORT, async (error) => {
    if (error) {
        return error;
    }

    return console.log(`server started on port here now ${PORT}`);
});