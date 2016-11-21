/*
  Utils functions while dev.
*/

//app.js
  // MOVIES_STORES 
  app.get('/api/v1/movies_stores', function(req, res) {
    var limit = req.query.limit || 100;
    var offset = req.query.offset || 0;
    
    services.moviesStores.all(limit, offset, function(error, movies_stores) {
      if (error) {
        res.status(422).json(error);
        return;
      }
      res.status(200).json(movies_stores);
    });
  });

  app.get('/api/v1/movies_stores/:id', function(req, res) {
    services.moviesStores.find(req.params.id, function(error, moviesStore) {
      if (error || !moviesStore) {
        res.status(422);
        res.end();
        return;
      }
      res.status(200).json(moviesStore);
      res.end();
    });
  });


//doc/example.RAML
  // Modelo para criação de documentação com RAML
  /account:
    securedBy: [Unauthenticated]
    displayName: ACCOUNTS

    description: |
      This is the top level description for /account.
      * One
      * Two
      * Three

    post:
      description: |
        Creates a new account. Some **bold** text here. More text. Need to fill the line, so make it longer still. Hooray!
        Line two

        Paragraph two
      body:
        application/json:
          example: |
            {
              "email": "john@example.com",
              "password": "super_secret",
              "name": "John Doe"
            }
      responses:
        200:
          description: Account was created and user is now logged in

    /find:
      get:
        description: find an account
        queryParameters:
          name:
            description: name on account
            required: true
            example: Naruto Uzumaki
          gender:
            enum: ["male", "female"]
            required: true
          number:
            type: integer
            default: 42
    /{id}:
      uriParameters:
        id:
          type: string
          description: account identifier
          minLength: 1
          maxLength: 10
      get:
        headers:
          Authorization:
            type: string
            description: Basic authentication header
            example: |
              Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

      put:
        description: Update the account
        body:
          application/x-www-form-urlencoded:
            formParameters:
              name:
                description: name on account
                type: string
                example: Naruto Uzumaki
              gender:
                enum: ["male", "female"]

      delete:
        description: Delete the account

    /login:
      post:
        description: Login with email and password
        body:
          application/json:
            example: |
              {
                "email": "john@example.com",
                "password": "super_secret"
              }
        responses:
          200:
            description: Login was correct
            body:
              text/xml:
                example: |
                  <test>This is a test</test>
          400:
            description: Login was incorrect, please try again
          401:
            description: Not authorized
            headers:
              WWW-Authenticate:
                type: string
                description: user was not authorized
                example: |
                  WWW-Authenticate: Basic realm="raml2html"

    /forgot:
      post:
        description: Sends an email to the user with a link to set a new password
        responses:
          200:
            description: Test
            body:
              text/xml:
                example: |
                  <test>This is a test</test>

    /session:
      get:
        description: Gets the sessions

      delete:
        description: Deletes the session, logging out the user


  /forecasts:
    displayName: Forecasts
    description: The very top resource - displays OK
    /{geoposition}:
      description: Overview endpoint to assemble and access forecast data in various timely resolutions - THIS IS NOT DISPLAYED ANYWHERE WITH RAML2HTML :/
      uriParameters:
        geoposition:
          description: A geoposition aquired by calling /geoposition/search - displays OK
          type: string
      get:
        description: Provides an overview of the available data - display OK
    /test:
      description: No methods here, but it does have a description


  /conversations:
    description: This is the top level description for /conversations.
    securedBy: [oauth_1_0, x-something]

    get:
      description: Get a list of conversation for the current user

    post:
      description: Create a new conversions. The currently logged in user doesn't need to be supplied in the members list, it's implied.
      body:
        application/json:
          example: |
            {
              "content": "My message!",
              "members": [1, 2, 3]
            }
      responses:
        200:
          description: A conversation with these members already existed, the message was added to that one
        201:
          description: The conversation was created and the message added to it

    /{convId}:
      get:
        description: Get a single conversation including its messages

      put:
        description: Update a conversation (change members)

      /messages:
        get:
          is: [ paged ]
          description: Get the messages for the conversation

        post:
          description: Add a new message to a conversation

        /{messageId}:
          put:
            description: Update the message

          delete:
            description: Delete the message


  /users:
    get:
      is: [ paged ]
      description: Get a list of all users
      queryParameters:
        from:
          description: Limit results to those created after from.
          example: '2014-12-31T00:00:00.000Z'
          type: string
          required: false
          pattern: ^[a-zA-Z].+$

    post:
      description: Creates a new user
      body:
        application/xml:
          example: |
            <h1>Hello!</h1>

    /{userId}:
      get:
        description: Get the details of a user including a list of groups he belongs to

      put:
        description: Update a user

      delete:
        description: Deletes a user


  /groups:
    get:
      description: Get a list of all the groups

    post:
      description: Create a new group
      body:
        application/json:
          example: |
            {
              "name": "Cool people",
              "members": [1, 2, 3]
            }

    /{groupId}:
      get:
        description: Get the details of a group, including the member list

      put:
        description: Update the group, **optionally** supplying the new list of members (overwrites current list)
        body:
          application/json:
            example: |
              {
                "name": "Cool people",
                "members": [1, 2, 3]
              }

      delete:
        description: Removes the group

      /users:
        post:
          description: Adds a user to a group
          body:
            application/json:
              example: |
                {
                  "user_id": 4,
                }

        /{userId}:
          delete:
            description: Removes a user from a group