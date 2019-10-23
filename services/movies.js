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
    console.log('movieId', movieId);
    console.log('movie', movie);
    const data = { 'data': movie };
    this.updatedMovieId = await this.mongoDb.update(this.collection, movieId, data);
    return this.updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    this.deletedMovieId = await this.mongoDb.delete(this.collection, movieId);
    return this.deletedMovieId;
  }

}

module.exports.MoviesService = MoviesService;

