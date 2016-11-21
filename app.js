'use strict'

var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    http = require('http'),
    app = express(),
    services = require('./services/');

// Express configs
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: '6f8c27af-7deb-4df5-b0c0-91a6b4d9dc9d',
    resave: true,
    saveUninitialized: true
}));



// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  
  if (!req.headers['authorization']) {
    res.sendStatus(401);
    res.end();
  } 
  else {
    var token = req.headers['authorization'].split('=')[1];
  
    services.users.find({ access_token: token }, function(error, user) {
      if (error || !user) {
        res.sendStatus(401);
        res.end();
        return;
      }
      else if (!req.session || !req.session.admin) {
        res.status(401).json({message: 'The session has expired, please login and try again.'}); 
        res.end();
        return;
      }
      else if (req.session && req.session.user === user.id && req.session.admin) {
        return next();
      }
    });
  }
};
 
// Login
app.post('/login', function (req, res) {
  
  var email = req.query.email || req.body.email,
      password = req.query.password || req.body.password;
  
  if (!email || !password) {
    res.status(401).json({message: 'Bad credentials.'}); 
    res.end();
    return;
  }
  else {
    services.users.login({ email: email, password: password }, function(error, user) {
      if (error) {
        res.status(401).json({message: 'Bad credentials.'}); 
        res.end();
        return;
      } 
      else {
        req.session.user = user.id;
        req.session.admin = true;
        res.status(200).json({message: 'Logged in.', access_token: user.access_token}); 
        res.end();
      }
    });
  }
});
 
// Logout
app.get('/logout', function (req, res) {
  
  req.session.destroy();
  res.status(200).json({message: 'Logged out.'}); 
  res.end();
});



// USERS
app.post('/api/v1/users', function(req, res) {
  
  services.users.create(req.body, function(error, user) {
    if (error) {
      res.status(422).json(error);
      res.end();
      return;
    }
    res.location(`/api/v1/users/${user.id}`);
    res.status(201);
    res.end();
  });
});

app.get('/api/v1/users', auth, function(req, res) {

  var limit = req.query.limit || 100,
      offset = req.query.offset || 0;
  
  services.users.all(limit, offset, function(error, users) {
    if (error) {
      res.status(422).json(error);
      res.end();
      return;
    }
    res.status(200).json(users);
    res.end();
  });
});

app.get('/api/v1/users/:id', auth, function(req, res) {
  
  services.users.find( { id: req.params.id }, function(error,user) {
    if (error || !user) {
      res.status(422);
      res.end();
      return;
    }
    res.status(200).json(user);
    res.end();
  });
});



// MOVIES
app.get('/api/v1/movies', auth, function(req, res) {
  
  var query = req.query.title;
  if (query) {
    services.movies.findByTitle(query, function(error, movies) {
      if (error) {
        res.status(422).json(error);
        return;
      }
      res.status(200).json(movies);
    });
  } 
  else { 
    var limit = req.query.limit || 100,
        offset = req.query.offset || 0;
    
    services.movies.all(limit, offset, function(error, movies) {
      if (error) {
        res.status(422).json(error);
        return;
      }
      res.status(200).json(movies);
    });
  }
});

app.get('/api/v1/movies/:id', auth, function(req, res) {
  
  services.movies.findWithAssociation(req.params.id, function(error, movie) {
    if (error) {
      res.status(422);
      res.end();
      return;
    }
    res.status(200).json(movie);
    res.end();
  });
});



// STORES
app.get('/api/v1/stores', auth, function(req, res) {
  
  var limit = req.query.limit || 100,
      offset = req.query.offset || 0;
  
  services.stores.all(limit, offset, function(error, store) {
    if (error) {
      res.status(422);
      res.end();
      return;
    }
    res.status(200).json(store);
    res.end();
  });
});

app.get('/api/v1/stores/:id', auth, function(req, res) {

  services.stores.findWithAssociation(req.params.id, function(error, store) {
    if (error) {
      res.status(422);
      res.end();
      return;
    }
    res.status(200).json(store);
    res.end();
  });
});



// RENTS 
app.post('/api/v1/rents/rent', auth, function(req, res) {
  
  services.rents.rent(req.session.user, req.body, function(error, rent) {
    if (error) {
      res.status(422).json(error);
      res.end();
      return;
    } 
    res.location(`/rents/${rent.id}`);
    res.status(201).json(rent);
    res.end();
  });
});

app.patch('/api/v1/rents/:id/devolve', auth, function(req, res) {

  services.rents.find( {id: req.params.id}, function(error, rent) {
    if (error) {
      res.status(422).json(error);
      res.end();
      return;
    }
    services.rents.devolve(rent, function(error, data) {
      if (error) {
        res.status(422).json(error);
        res.end();
        return;
      }
      res.status(200).json(data);
      res.end();
    });
  });
});



// SERVER
var server = http.createServer(app);
server.listen(process.argv[2] || 9999, function() {
  
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Web server listening at http://${host}:${port}`);
});
