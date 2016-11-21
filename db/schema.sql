-- CREATE EXTENSION "uuid-ossp";
-- Table: users
-- Table: movies
-- Table: stores
-- Table: movies_stores
-- Table: rents
-- CREATE USERS
-- CREATE STORES
-- CREATE MOVIES
-- CREATE MOVIES_STORES
-- CREATE RENTS

-- EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Table: users
-- DROP TABLE users;
CREATE TABLE users
(
id uuid NOT NULL DEFAULT uuid_generate_v4(),
name character varying NOT NULL,
password character varying NOT NULL,
email character varying NOT NULL,
access_token uuid,
created_at timestamp without time zone DEFAULT now(),
updated_at timestamp without time zone DEFAULT now(),
CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
OIDS=FALSE
);


-- Table: movies
-- DROP TABLE movies;

CREATE TABLE movies
(
id uuid NOT NULL DEFAULT uuid_generate_v4(),
title character varying NOT NULL,
director character varying NOT NULL,
created_at timestamp without time zone DEFAULT now(),
updated_at timestamp without time zone DEFAULT now(),
CONSTRAINT movies_pkey PRIMARY KEY (id)
)
WITH (
OIDS=FALSE
);

-- Table: stores
-- DROP TABLE stores;

CREATE TABLE stores
(
id uuid NOT NULL DEFAULT uuid_generate_v4(),
name character varying NOT NULL,
created_at timestamp without time zone DEFAULT now(),
updated_at timestamp without time zone DEFAULT now(),
CONSTRAINT stores_pkey PRIMARY KEY (id)
)
WITH (
OIDS=FALSE
);


-- Table: movies_stores
-- DROP TABLE movies_stores;

CREATE TABLE movies_stores
(
id uuid NOT NULL DEFAULT uuid_generate_v4(),
store_id uuid NOT NULL,
movie_id uuid NOT NULL,
copies integer NOT NULL,
rents integer NOT NULL,
created_at timestamp without time zone DEFAULT now(),
updated_at timestamp without time zone DEFAULT now(),
CONSTRAINT movie_rentals_pkey PRIMARY KEY (id),
CONSTRAINT movie_fk FOREIGN KEY (movie_id)
    REFERENCES movies (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT store_fk FOREIGN KEY (store_id)
    REFERENCES stores (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);


-- Table: rents
-- DROP TABLE rents;

CREATE TABLE rents
(
id uuid NOT NULL DEFAULT uuid_generate_v4(),
user_id uuid NOT NULL,
movies_stores_id uuid NOT NULL,
should_return_at timestamp without time zone,
returned_at timestamp without time zone,
created_at timestamp without time zone DEFAULT now(),
updated_at timestamp without time zone DEFAULT now(),
CONSTRAINT rents_pkey PRIMARY KEY (id),
CONSTRAINT movies_stores_fk FOREIGN KEY (movies_stores_id)
    REFERENCES movies_stores (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
CONSTRAINT user_fk FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
OIDS=FALSE
);



-- CREATE USERS
INSERT INTO users(id, name, password, email, access_token) 
VALUES ('a496f2e4-05e3-46e0-a22d-8f47dcb46845', 'annasuzel', 'annasuzel', 'anna@gmail.com', '8d937e42-3cb9-4de2-a0fb-dbcb28529928');
INSERT INTO users(id, name, password, email, access_token) 
VALUES ('4f80fd55-c044-4aed-b421-72b195908343', 'ivonei', 'ivoneijr', 'ivoneijr@gmail.com', '56553e68-8f6f-4b81-b84e-0060c3a69634');
INSERT INTO users(id, name, password, email, access_token) 
VALUES ('1db05473-a36b-4b5f-9271-29e5a2d3be84', 'arianne', 'arianne', 'arianne@gmail.com', '614b0ade-5b93-4565-bb94-de593013fe6a');
INSERT INTO users(id, name, password, email, access_token) 
VALUES ('7cdf2618-4dde-4b5d-a54a-955b07e296a2', 'testenewuser', 'testenewuser', 'testenewuser@gmail.com', 'e37b4dca-7c13-46a3-a4a0-6506824ecf5a');


-- CREATE STORES
INSERT INTO stores(id, name) 
VALUES ('24c37620-51eb-4666-8b37-6aaab9e14f41', 'locadora 1');
INSERT INTO stores(id, name) 
VALUES ('690c0e3a-5d6f-4d2d-a7d3-cc9423861ca3', 'locadora 2');


-- CREATE MOVIES
INSERT INTO movies(id, title, director) 
VALUES ('9d62ef53-29ae-42ca-9ce1-b332b752edb9', 'title1', 'director1');
INSERT INTO movies(id, title, director) 
VALUES ('8f046922-6057-47c3-ac02-7d42823d651b', 'title2', 'director1');
INSERT INTO movies(id, title, director) 
VALUES ('5861551a-2fd9-41d9-b8e6-ac3f348524a1', 'title3', 'director1');
INSERT INTO movies(id, title, director) 
VALUES ('7a8032c6-1bfa-401f-a6bd-fee9f460add9', 'title4', 'director1');
INSERT INTO movies(id, title, director) 
VALUES ('2e0aefde-7fb7-4ff0-9f1a-6dfc67c9683d', 'title5', 'director1');
INSERT INTO movies(id, title, director) 
VALUES ('e8f48586-6a73-45e9-aa6a-cf9e5d41e362', 'title12', 'director2');
INSERT INTO movies(id, title, director) 
VALUES ('bf277c25-aaff-41f1-b83b-2ec5310b9fe4', 'title13', 'director2');
INSERT INTO movies(id, title, director) 
VALUES ('1c098552-560f-4114-a409-d3ee3edb71fb', 'title14', 'director3');

-- CREATE MOVIES_STORES
INSERT INTO movies_stores(id, store_id, movie_id, copies, rents) 
VALUES ('5a309a9b-dc43-40ff-921c-9492027fba0f', '24c37620-51eb-4666-8b37-6aaab9e14f41', '5861551a-2fd9-41d9-b8e6-ac3f348524a1', 10, 9);
INSERT INTO movies_stores(id, store_id, movie_id, copies, rents) 
VALUES ('85d17124-4119-4731-8799-08996096d1d4', '690c0e3a-5d6f-4d2d-a7d3-cc9423861ca3', '5861551a-2fd9-41d9-b8e6-ac3f348524a1', 10, 5);
INSERT INTO movies_stores(id, store_id, movie_id, copies, rents) 
VALUES ('c4ee0e6b-4b73-49da-a2f4-60611f19a365', '24c37620-51eb-4666-8b37-6aaab9e14f41', '9d62ef53-29ae-42ca-9ce1-b332b752edb9', 10, 9);


-- CREATE RENTS
INSERT INTO rents(id, user_id, movies_stores_id, should_return_at, returned_at) 
VALUES ('85972acb-6f54-45cb-b577-af638f4ad814', '4f80fd55-c044-4aed-b421-72b195908343', 'c4ee0e6b-4b73-49da-a2f4-60611f19a365', '2016-11-13 19:10:43.832', '2016-11-11 13:01:07.689');
INSERT INTO rents(id, user_id, movies_stores_id, should_return_at, returned_at) 
VALUES ('f0496f3b-9224-4fa1-b087-02dd9c24a292', '4f80fd55-c044-4aed-b421-72b195908343', 'c4ee0e6b-4b73-49da-a2f4-60611f19a365', '2016-11-14 14:18:21.768', '2016-11-11 14:19:21.618');
INSERT INTO rents(id, user_id, movies_stores_id, should_return_at, returned_at) 
VALUES ('851439db-b61b-4ba3-8726-f7306d2bf5e7', '4f80fd55-c044-4aed-b421-72b195908343', 'c4ee0e6b-4b73-49da-a2f4-60611f19a365', '2016-11-14 13:02:07.983', '2016-11-11 13:01:07.689');
INSERT INTO rents(id, user_id, movies_stores_id, should_return_at, returned_at) 
VALUES ('7549196c-c047-4e87-9153-ad005d26c5a2', '1db05473-a36b-4b5f-9271-29e5a2d3be84', 'c4ee0e6b-4b73-49da-a2f4-60611f19a365', '2016-11-15 13:05:41.183', '2016-11-12 14:34:03.328');
INSERT INTO rents(id, user_id, movies_stores_id, should_return_at, returned_at) 
VALUES ('801e87ad-f056-40ab-bf79-6659650386b1', '1db05473-a36b-4b5f-9271-29e5a2d3be84', 'c4ee0e6b-4b73-49da-a2f4-60611f19a365', '2016-11-15 15:47:34.209', '2016-11-12 15:48:08.108');
INSERT INTO rents(id, user_id, movies_stores_id, should_return_at, returned_at) 
VALUES ('416f4d46-11d5-430d-8a5e-e8221281796a', '1db05473-a36b-4b5f-9271-29e5a2d3be84', 'c4ee0e6b-4b73-49da-a2f4-60611f19a365', '2016-11-15 16:38:40.913', '2016-11-12 16:39:42.653');

