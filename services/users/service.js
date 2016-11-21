const CONSTRAINTS = require('./constraints');

class UserService {

  constructor(knex, validatate, uuid) {
    this.knex = knex;
    this.validatate = validatate;
    this.constraints = CONSTRAINTS;
    this.uuid = uuid;
    knex('users').columnInfo().then(columns => {
      this.columns = columns;
    });
  }

  create(data, callback) {
    let error = (error) => { callback(error); }
    
    this.validatate
      .async(data, this.constraints.CREATE)
      .then(user => {
        this.knex('users')
        .insert(user)
        .returning('*')
        .then(rows => {
          callback(null, rows[0]);
        })
        .catch(error);
      })
      .catch(error);
  }

  find(user,callback) {
    this.knex.select(['id', 'name', 'email'])
    .from('users')
    .where(user)
    .then(rows => {
      callback(null,rows[0]);
    })
    .catch(error => callback(error));
  }
  
  login(user,callback) {
    this.knex.select('*')
    .from('users')
    .where(user)
    .then(rows => {
      this.generateAccessToken(rows[0], function(error, user){
        if (error) {
          callback(error);
        }
        else {
          callback(null, user);
        }
      })
    })
    .catch(error => callback(error));
  }

  all(limit, offset, callback) {
    this.knex.select(['id', 'name', 'email'])
    .from('users')
    .limit(limit)
    .offset(offset)
    .then(rows => {
      callback(null,rows);
    })
    .catch(error => callback(error));
  }
  
  generateAccessToken(user, callback) {
    var uuid = this.uuid.v4();
    this.knex('users')
    .where('id', user.id)
    .update({
      'updated_at': new Date(),
      'access_token': uuid
    })
    .returning('*')
    .then(rows => {
      callback(null, rows[0]);
    })
    .catch(error => callback(error));
  }

  delete(id, callback) {
    this.knex('users')
    .where('id', id)
    .del()
    .then(isDeleted => {
      callback(null,isDeleted);
    })
    .catch(error => callback(error));
  }
}

module.exports = UserService;
