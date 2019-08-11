CREATE TABLE IF NOT EXISTS cards (
    id serial primary key,
    title varchar,
    weight int,
    impact int,
    label varchar, 
    due_date varchar,
    description text, 
    working_users varchar
);

