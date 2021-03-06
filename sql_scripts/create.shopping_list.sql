
DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);

DROP TABLE IF EXISTS shopping_list;
CREATE TABLE IF NOT EXISTS shopping_list (
    id integer primary key generated by default as identity,
    name text not null,
    price decimal(12, 2) not null,
    date_added timestamp not null default now(),
    checked boolean not null DEFAULT false,
    category grocery not null
);
