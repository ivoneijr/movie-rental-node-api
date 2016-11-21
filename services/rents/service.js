const CONSTRAINTS = require('./constraints');
let services = require('../index');

class RentsService {

  constructor(knex, validate) {
    this.knex = knex;
    this.validate = validate;
    this.constraints = CONSTRAINTS;
    knex('rents').columnInfo().then(columns => {
      this.columns = columns;
    });
  }
  
  create(data, callback) {
    let error = (error) => { callback(error); }
    
    this.validate
      .async(data, this.constraints.CREATE)
      .then(rent => {
        this.knex('rents')
        .insert(rent)
        .returning('*')
        .then(rows => {
          services.moviesStores.incrementRents(rows[0], function(err, data) {
            if (err) {
              callback(err);
            }
            callback(null, rows[0]);
          });
        })
        .catch(error);
      })
      .catch(error);
  }
  
  find(rent, callback) {
    this.knex.select('*')
    .from('rents')
    .where(rent)
    .then(rows => {
      callback(null,rows[0]);
    })
    .catch(error => callback(error));
  }
  
  rent(userId, movieStore, callback) {
    
    services.moviesStores.isAvailableToRent(movieStore, function(error, availableMovieStore) {
      if (error) { 
        callback(error); 
      }
      
      var returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 3);
      
      var rent = {
        user_id: userId,
        movies_stores_id: availableMovieStore.id,
        should_return_at: returnDate
      }
      
      services.rents.create(rent, function(error, created) {
        if (error) {
          callback(error);
        }
        callback(null, created);
      });
    });
  }
  
  devolve(rent, callback) {
    if (rent.returned_at) {
      callback({message: 'This title has already been returned.'})
    } 
    else {
      var today = new Date();
      
      this.knex('rents')
      .where('id', rent.id)
      .update({
        'returned_at': today, 
        'updated_at': today 
      })
      .returning('*')
      .then(rows => {
        services.moviesStores.decrementRents(rows[0], function(err, data) {
          if (err) {
            callback(err);
          }
          if (today > rent.should_return_at) {
            callback(null, {message: "Title delivered AFTER deadline! You must pay $1.000,00 =)"});
          }
          else {
            callback(null, {message: "Title delivered before deadline! Have a nice day! ;)"});
          }
        })
      })
      .catch(error => callback(error));
    }
  }
}

module.exports = RentsService;
