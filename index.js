const express = require('express');
const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const yearApi = require('./routes/year');
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const app = express();

// body parser middleware
app.use(express.json());

//routes
yearApi(app);
moviesApi(app);

// Catch 404
app.use(notFoundHandler);

//Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${config.port}`);
});

