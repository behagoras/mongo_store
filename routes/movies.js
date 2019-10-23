const express = require('express');
const { MoviesService } = require('../services/movies');

// const { moviesMock } = require('../utils/mocks/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      // throw new Error('error getting movies'); // Forcing error
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });
  router.get('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movie = await moviesService.getMovie({ movieId });
      res.status(200).json({
        data: movie,
        message: 'movie retrieved',
      });
    } catch (error) {
      next(error);
    }
  });
  router.post('/', async (req, res, next) => {
    const { body: movie } = req;
    try {
      const createMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({
        data: createMovieId,
        message: 'movies created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:movieId', async (req, res, next) => {
    const { body: movie } = req;
    const { movieId } = req.params;
    // const data = { 'data': movie };

    try {
      const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated',
      });
    } catch (error) {
      next(error);
    }
  });
  router.delete('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    console.log('deleting', movieId); // eslint-disable-line no-console
    const data = { '_id': movieId };
    try {
      const deletedMovieId = await moviesService.deleteMovie({ data });
      res.status(200).json({
        data: movieId,
        message: (deletedMovieId ? 'movie deleted' : 'movie does not exists'),
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApi;

