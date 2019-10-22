const express = require('express');
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const yearApi = require('./routes/year');
const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');

const app = express();

// body parser middleware
app.use(express.json());

yearApi(app);
moviesApi(app);

//Error middleware
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});

