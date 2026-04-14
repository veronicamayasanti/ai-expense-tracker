const { PORT, ALLOWED_ORIGINS } = require('./config/env');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
