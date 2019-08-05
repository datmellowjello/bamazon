DROP DATABASE IF EXISTS bamazo_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100),
    department_name VARCHAR (100),
    price DECIMAL (10, 2),
    stock_quantity INTEGER (100),
    PRIMARY KEY(item_id)

);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Baker Skateboard","Decks",60.0,50);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Alien Skateboard","Decks",60.9,50);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Powell Skateboard","Decks",60.0,50);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Spitfire","Wheels",30,20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Bones","Wheels",30,20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Ricta","Wheels",30,20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Thunder Trucks","Trucks",45,100);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Venture Trucks","Trucks",45,100);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Independent Trucks","Trucks",45,100);

INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES("Ace Trucks","Trucks",45,100);