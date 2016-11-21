let services = require('../index');

class MoviesStoresService {

  constructor(knex, lodash) {
    this.knex = knex;
    this._ = lodash;
    knex('movies_stores').columnInfo().then(columns => {
      this.columns = columns;
    });
  }
  
  find(id, callback) {
    this.knex('movies_stores')
    .where('movies_stores.id', id)
    .join('stores', 'movies_stores.store_id', '=', 'stores.id')
    .join('movies', 'movies_stores.movie_id', '=', 'movies.id')
    .select(
      'movies_stores.id',
      'stores.id as store_id',
      'stores.name as store_name',
      'movies.id as movie_id',
      'movies.title as movie_title',
      'movies.director as movie_director',
      'movies_stores.copies', 
      'movies_stores.rents'
    ).then(rows => {
      var row = rows[0];
      row.store = {
        id: row.store_id,
        name: row.store_name
      }
      row.movie = {
        id: row.movie_id,
        title: row.movie_title,
        director: row.movie_director,
      }
      
      delete row.store_id;
      delete row.store_name;
      delete row.movie_id;
      delete row.movie_title;
      delete row.movie_director;
      
      callback(null,row);
    })
    .catch(error => callback(error));
  }
  
  all(limit, offset, callback) {
    this.knex('movies_stores')
    .join('stores', 'movies_stores.store_id', '=', 'stores.id')
    .join('movies', 'movies_stores.movie_id', '=', 'movies.id')
    .select(
      'movies_stores.id',
      'stores.id as store_id',
      'stores.name as store_name',
      'movies.id as movie_id',
      'movies.title as movie_title',
      'movies.director as movie_director',
      'movies_stores.copies', 
      'movies_stores.rents'
    ).limit(limit).offset(offset)
    .then(rows => {
      this._.each(rows, function(row){
        row.store = {
          id: row.store_id,
          name: row.store_name
        }
        row.movie = {
          id: row.movie_id,
          title: row.movie_title,
          director: row.movie_director,
        }
        
        delete row.store_id;
        delete row.store_name;
        delete row.movie_id;
        delete row.movie_title;
        delete row.movie_director;
      })
      callback(null,rows);
    })
  }

  isAvailableToRent(movieStore, callback) {
    this.knex.select('*')
    .from('movies_stores')
    .where(movieStore)
    .then(rows => {
      var availableMovieStore = rows[0];
      
      if (!availableMovieStore) {
        callback({message: 'Movie not available.'});
      }
      else {
        if (availableMovieStore.rents === availableMovieStore.copies) {
          callback({message: 'All copies of this movie in this store were rented.'});
        } 
        else {
          callback(null, availableMovieStore);
        }
      }
    })
    .catch(error => callback(error));
  }
  
  incrementRents(rent, callback) {
    this.knex('movies_stores')
    .where('id', rent.movies_stores_id)
    .update({
      'updated_at': new Date(),
      'rents': this.knex.raw('rents + 1')
    })
    .then(rows => {
      callback(null, rent);
    })
    .catch(error => callback(error));
  }
  
  decrementRents(rent, callback) {
    this.knex('movies_stores')
    .where('id', rent.movies_stores_id)
    .update({
      'updated_at': new Date(),
      'rents': this.knex.raw('rents - 1')
    })
    .then(rows => {
      callback(null, rent);
    })
    .catch(error => callback(error));
  }
}

module.exports = MoviesStoresService;
