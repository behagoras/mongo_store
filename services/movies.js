const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
  async getMovies() {
    this.movies = await Promise.resolve(moviesMock);
    return this.movies || [];
  }

  async getMovie() {
    this.movie = await Promise.resolve(moviesMock[0]);
    return this.movie || [];
  }

  async createMovie() {
    this.createdMovieId = await Promise.resolve(moviesMock[0].id);
    return this.createdMovieId;
  }

  async updateMovie() {
    this.updatedMovieId = await Promise.resolve(moviesMock[0].id);
    return this.updatedMovieId;
  }

  async deleteMovie() {
    this.deletedMovieId = await Promise.resolve(moviesMock[0].id);
    return this.deletedMovieId;
  }

}

module.exports.MoviesService = MoviesService;

