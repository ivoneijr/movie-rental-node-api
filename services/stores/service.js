class StoreService {

  constructor(knex, lodash) {
    this.knex = knex;
    this._ = lodash;
    knex('stores').columnInfo().then(columns => {
      this.columns = columns;
    });
  }

  all(limit, offset, callback) {
    this.knex.select(['id','name'])
    .from('stores')
    .limit(limit)
    .offset(offset)
    .then(rows => {
      callback(null, rows);
    })
    .catch(error => callback(error));
  }
  
  find(store, callback) {
    this.knex.select('*')
    .from('stores')
    .where(store)
    .then(rows => {
      callback(null,rows[0]);
    })
    .catch(error => callback(error));
  }
  
  findWithAssociation(id, callback) {
    this.knex('stores')
    .where('stores.id', id)
    .join('movies_stores', 'stores.id', '=', 'movies_stores.store_id')
    .join('movies', 'movies_stores.movie_id', '=', 'movies.id')
    .select(
      'stores.id',
      'stores.name',
      'movies.id as movie_id',
      'movies.title',
      'movies.director',
      'movies_stores.copies',
      'movies_stores.rents'
    ).then(rows => {
      var store = {
        id: rows[0].id,
        name: rows[0].name,
        movies: []
      }
      this._.each(rows, function(row){
        store.movies.push({
          id: row.movie_id,
          title: row.title,
          director: row.director,
          copies: row.copies,
          rents: row.rents,
          available: (row.copies - row.rents)
        });
      });
      
      callback(null, store);
    })
    .catch(error => callback(error));
  }
  
}

module.exports = StoreService;
