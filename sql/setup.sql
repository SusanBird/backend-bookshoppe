-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    bookname VARCHAR NOT NULL,
    dob DATE,
    pob VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released NUMBER NOT NULL     
);

INSERT INTO authors (
    bookname,
    dob, 
    pob
)
VALUES
    ('Mark Twain', 11-30-1835, 'Florida, Missouri'),
    ('Charles Dickens', 02-07-1812, 'Portsmouth, United Kingdom'),
    ('Maya Angelou', 04-04-1928, 'St. Louis, Missouri'),
    ('J.K. Rowling', 07-31-1965, 'Yate, United Kingdom')
;

INSERT INTO books 
    ('Adventures of Huckleberry Finn', 1884),
    ('A Christmas Carol', 1843),
    ('I Know Why the Caged Bird Sings', 1969),
    ('Harry Potter', 1997)











