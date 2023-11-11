
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const portAppListen = 3000;


mongoose.connect('mongodb://127.0.0.1:27017/productsdb', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database connection established'));

app.use(express.json());

const productsdbRouter = require('../routes/productsdb');
app.use('/productsdb', productsdbRouter);

app.listen(portAppListen,()=>console.log('Server running on port ' + portAppListen));

