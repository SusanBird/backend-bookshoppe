-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS authors_books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;


CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    authname VARCHAR NOT NULL,
    dob DATE,
    pob VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT NOT NULL     
);

CREATE TABLE authors_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    book_id BIGINT,
    author_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors (
    authname,
    dob, 
    pob
)
VALUES
    ('Mark Twain', '1835-11-30', 'Florida, Missouri'),
    ('Charles Dickens', '1812-02-07', 'Portsmouth, United Kingdom'),
    ('Maya Angelou', '1928-04-04', 'St. Louis, Missouri'),
    ('J.K. Rowling', '1965-07-31', 'Yate, United Kingdom');

INSERT INTO books (
    title,
    released
)
VALUES
    ('Adventures of Huckleberry Finn', 1884),
    ('A Christmas Carol', 1843),
    ('I Know Why the Caged Bird Sings', 1969),
    ('Harry Potter', 1997);

INSERT INTO authors_books (
    book_id,
    author_id
)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4);








