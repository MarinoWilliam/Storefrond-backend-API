/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    quantity INTEGER,
    userID INTEGER REFERENCES users(id),
    orderstate TEXT
);
