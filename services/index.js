'use strict'

let { UserService } = require('./users/');
let { MovieService } = require('./movies/');
let { StoreService } = require('./stores/');
let { MoviesStoresService } = require('./movies_stores/');
let { RentsService } = require('./rents/');

let validate = require('validate.js');
let _ = require('lodash');
let uuid = require('uuid');

let knex = require('knex')({
  client: 'pg',
  connection: 'postgres://postgres:postgres@localhost:5432/rental'
});

module.exports.users = new UserService(knex, validate, uuid);
module.exports.movies = new MovieService(knex, validate, _);
module.exports.stores = new StoreService(knex, _);
module.exports.moviesStores = new MoviesStoresService(knex, _);
module.exports.rents = new RentsService(knex, validate);
