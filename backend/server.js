'use strict';

const express = require('express');
const mongoose = require('mongoose');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const url = 'mongodb://localhost:27017/testdbs';
// const data = require('./data/data.json');

// App
const app = express();

// ###### Connect to MongoDB ####### //
mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ####### SCHEMAS ###### //
const sampleSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Sample = mongoose.model('Sample', sampleSchema);
console.log(Sample)

const testSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Test = mongoose.model('Test', testSchema);

// ####### ROUTES ######## //
app.get('/samples', async (req, res) => {
  try {
    const samples = await Sample.find();
    res.send(samples);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/test', async (req, res) => {
  try {
    const tests = await Test.find();
    res.send(tests);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/users', (req, res) => {
//   res.json(data)
// })

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});