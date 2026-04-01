const { PORT } = require('./config/env');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
