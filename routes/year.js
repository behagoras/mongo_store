const express = require('express');

function yearApi(app) {
  const router = express.Router();
  app.use('/', router);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  router.get('/year/:year', (req, res, next) => {
    try {
      const { year } = req.params;
      const isFourDivisible = !(year % 4);
      const isHundredDivisible = !(year % 100);
      const isFourHundredDivisible = !(year % 400);

      if (isFourDivisible && !isHundredDivisible || isFourHundredDivisible) {
        res.send(`El año ${year} es bisiesto`);
      } else {
        res.send(`El año ${year} no es bisiesto`);
      }
    } catch (error) {
      next(error);

    }
  });

}

module.exports = yearApi;

