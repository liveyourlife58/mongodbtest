const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = require('./routes/api');
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api', router);

module.exports.handler = serverless(app);
