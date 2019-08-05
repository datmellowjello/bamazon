var inquirer = require("inquirer");

var mysql = require("mysql");

// global variables for storing item_id and stock_quantity for later checks
var clientItem;
var clientQuantity;
var dbQuantity;
var totalCost;



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootpassword",
    database: "bamazon_DB"

});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
})


function queryItems {


    
}