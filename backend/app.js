const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const osRoutes = require('./routes/os');

app.use('/api/auth', authRoutes);
app.use('/api/os', osRoutes);

module.exports = app;
