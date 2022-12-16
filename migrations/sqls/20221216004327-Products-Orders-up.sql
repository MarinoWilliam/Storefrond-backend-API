/* Replace with your SQL commands */
CREATE TABLE Products_Orders (
    id SERIAL PRIMARY  KEY,
    productID INTEGER REFERENCES products(id),
    userID INTEGER REFERENCES users(id)
);

