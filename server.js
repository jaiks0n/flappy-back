const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const { PORT, MONGO_URI } = process.env;

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
//app.use(cors())
app.use(express.json());
//app.use(cookieParser());

app.use('/users', userRoutes);

async function init() {
  const connection = await mongoose.connect(MONGO_URI, {
    dbName: 'FlappyUsers',
  });
  if (connection) {
    console.log('Connected to DB');
    app.listen(PORT || 8080, () => {
      console.log('App is listening on port ' + PORT);
    });
  }
}

init();
