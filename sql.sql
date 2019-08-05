DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INT AUTO_INCREMENT,
  
   product_name varchar(100),

   department_name VARCHAR(100), 

   price int,

    stock_quantity int,
);

