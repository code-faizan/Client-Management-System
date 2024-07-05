const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const serviceRoutes = require('./routes/services');

const app = express();

// Middleware
app.use(cors({
  origin : [""] , 
  methods:["POST","GET","PUT","DELETE"],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:Nz0wNPPEb07eYNkt@cluster0.mpqvi0l.mongodb.net/client-management?retryWrites=true&w=majority&appName=Cluster0
')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
