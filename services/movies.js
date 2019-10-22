// const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDb = new MongoLib();
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    this.movies = await this.mongoDb.getAll(this.collection, { query });
    return this.movies || [];
  }

  async getMovie({ movieId }) {
    this.movie = await this.mongoDb.get(this.collection, movieId);
    return this.movie || [];
  }

  async createMovie({ movie }) {
    this.createdMovieId = await this.mongoDb.create(this.collection, movie);
    return this.createdMovieId;
  }

  async updateMovie({ movieId, movie } = {}) {
    this.updatedMovieId = await this.mongoDb.update(this.collection, movieId, movie);
    return this.updatedMovieId;
  }

  async deleteMovie() {
    this.deletedMovieId = await Promise.resolve(moviesMock[0].id);
    return this.deletedMovieId;
  }

}

module.exports.MoviesService = MoviesService;

