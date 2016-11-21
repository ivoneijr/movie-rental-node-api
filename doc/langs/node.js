var request = require("request");
// /login
var options = { method: 'POST',
  url: 'http://127.0.0.1:9999/login',
  headers: 
   { 'postman-token': '61a11b83-1c03-2b8d-7f9c-547e30c0fe25',
     'cache-control': 'no-cache',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /logout
var options = { method: 'GET',
  url: 'http://127.0.0.1:9999/logout',
  headers: 
   { 'postman-token': '9a6c50ab-32c1-0ce6-ab50-f3ce34c2c7d1',
     'cache-control': 'no-cache',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/users
var options = { method: 'GET',
  url: 'http://127.0.0.1:9999/api/v1/users',
  headers: 
   { 'postman-token': '357d5dd2-9052-2f1f-3a72-8fe027e339b9',
     'cache-control': 'no-cache',
     authorization: 'Token token=28bc4016-1960-4726-9094-4eb86972178c',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/users/a496f2e4-05e3-46e0-a22d-8f47dcb46845
var options = { method: 'GET',
  url: 'http://127.0.0.1:9999/api/v1/users/a496f2e4-05e3-46e0-a22d-8f47dcb46845',
  headers: 
   { 'postman-token': 'c4728c52-c208-57b4-2fad-a516df8f15cc',
     'cache-control': 'no-cache',
     authorization: 'Token token=28bc4016-1960-4726-9094-4eb86972178c',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/users
var options = { method: 'POST',
  url: 'http://127.0.0.1:9999/api/v1/users',
  headers: 
   { 'postman-token': 'deb5e6af-972b-7705-be46-ded51712c769',
     'cache-control': 'no-cache',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/movies
var options = { method: 'GET',
  url: 'http://127.0.0.1:9999/api/v1/movies',
  qs: { title: '1' },
  headers: 
   { 'postman-token': '51b568f9-e7a6-d183-fd80-d899916be76c',
     'cache-control': 'no-cache',
     authorization: 'Token token=28bc4016-1960-4726-9094-4eb86972178c' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/movies
var options = { method: 'GET',
  url: 'http://127.0.0.1:9999/api/v1/movies',
  headers: 
   { 'postman-token': '3868bf20-12dd-772b-70ec-464f4bd9e676',
     'cache-control': 'no-cache',
     authorization: 'Token token=28bc4016-1960-4726-9094-4eb86972178c' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/rents/rent
var options = { method: 'POST',
  url: 'http://127.0.0.1:9999/api/v1/rents/rent',
  headers: 
   { 'postman-token': 'de3d0652-b554-ed5e-643b-5ac176e23ffc',
     'cache-control': 'no-cache',
     authorization: 'Token token=28bc4016-1960-4726-9094-4eb86972178c',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// /api/v1/rents/416f4d46-11d5-430d-8a5e-e8221281796a/devolve
var options = { method: 'PATCH',
  url: 'http://127.0.0.1:9999/api/v1/rents/416f4d46-11d5-430d-8a5e-e8221281796a/devolve',
  headers: 
   { 'postman-token': '430d1247-0a5a-c6c7-4a55-653c890b85ff',
     'cache-control': 'no-cache',
     authorization: 'Token token=28bc4016-1960-4726-9094-4eb86972178c',
     'content-type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
