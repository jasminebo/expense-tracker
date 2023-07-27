const express = require("express");
const bodyParser = require("body-parser");
const db = require('./queries')

const app = express();
const port = 8000;

const expenses = [];
let total = 0;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    const day = new Date();
    let options = {month:"long"};
    let month = day.toLocaleString("en-US", options);
    res.render("tracker", {todaysMonth: month, expenseList: expenses, totalAmount: total});
})

app.post("/", function(req, res) {
    const formatter = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD",});
    let date = req.body.date;
    let amount = req.body.amount;
    let place = req.body.place;
    let category = req.body.category;
    total += Number(amount);
    total = formatter.format(total)
    let map = new Map()
    map.set("date", date)
    map.set("amount", formatter.format(amount))
    map.set("place", place)
    map.set("category", category)
    expenses.push(map);
    db.createExpense(req, res)
    res.redirect("/");
})

//app.post("/expenses", db.createExpense)

app.listen(port, function() {
    console.log("Server started on port 8000");
})