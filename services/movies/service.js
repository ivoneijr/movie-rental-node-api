const CONSTRAINTS = require('./constraints');

class MovieService {

  constructor(knex, validatate, lodash) {
    this.knex = knex;
    this.validatate = validatate;
    this.constraints = CONSTRAINTS;
    this._ = lodash;
    knex('movies').columnInfo().then(columns => {
      this.columns = columns;
    });
  }
  
  find(movie,callback) {
    this.knex.select(['title','director','created_at'])
    .from('movies')
    .where(movie)
    .then(rows => {
      callback(null,rows[0]);
    })
    .catch(error => callback(error));
  }
  
  findWithAssociation(id, callback) {
    this.knex('movies')
    .where('movies.id', id)
    .join('movies_stores', 'movies.id', '=', 'movies_stores.movie_id')
    .join('stores', 'movies_stores.store_id', '=', 'stores.id')
    .select(
      'movies.id',
      'movies.title',
      'movies.director', 
      'movies_stores.copies',
      'movies_stores.rents',
      'stores.id as store_id',
      'stores.name as store_name'
    ).then(rows => {
      var movie = {
        id: rows[0].id,
        title: rows[0].title,
        director: rows[0].director,
        stores: []
      }
      
      this._.each(rows, function(row){
        movie.stores.push({
          id: row.store_id,
          name: row.store_name,
          copies: row.copies,
          rents: row.rents,
          available: (row.copies - row.rents)
        });
      });
      
      callback(null, movie);
    })
    .catch(error => callback(error));
  }

  findByTitle(title,callback) {
    this.knex.select(['title','director','created_at'])
    .from('movies')
    .where('title', '~*', `${title}`)
    .then(rows => {
      callback(null,rows);
    })
    .catch(error => callback(error));
  }

  all(limit, offset, callback) {
    this.knex.select(['title','director','created_at'])
    .from('movies')
    .limit(limit)
    .offset(offset)
    .then(rows => {
      callback(null,rows);
    })
    .catch(error => callback(error));
  }

}

module.exports = MovieService;
