const express = require('express');
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const yearApi = require('./routes/year');

const app = express();

yearApi(app);
moviesApi(app);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});

