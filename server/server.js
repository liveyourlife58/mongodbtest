const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));



// Schema and Model
const InputSchema = new mongoose.Schema({
    customerName: String,
    notes: String,
    billing1: String,
    billing2: String,
    billing3: String,
    co1: Boolean,
    co2: Boolean,
    scheduling: String
  });

const Input = mongoose.model('Input', InputSchema);

// Routes

  app.post('/api/inputs', (req, res) => {
    const newInput = new Input({
      customerName: req.body.customerName,
      notes: req.body.notes,
      billing1: req.body.billing1,
      billing2: req.body.billing2,
      billing3: req.body.billing3,
      co1: req.body.co1,
      co2: req.body.co2,
      scheduling: req.body.scheduling
    });

  newInput.save()
    .then(input => res.json(input))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET route for retrieving all inputs
app.get('/api/inputs', (req, res) => {
  Input.find()
    .then(inputs => res.json(inputs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// PUT route for updating an input
app.put('/api/inputs/:id', (req, res) => {
    Input.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(input => res.json(input))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // DELETE route for deleting an input
  app.delete('/api/inputs/:id', (req, res) => {
    Input.findByIdAndDelete(req.params.id)
      .then(() => res.json('Input deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
