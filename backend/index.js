require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const iotRoutes = require('./routes/iotRoutes');


const app = express();
app.use(express.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/iot', iotRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
