CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    name varchar(255) NOT NULL,
    password text NOT NULL,
    email email NOT NULL
);