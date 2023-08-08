const express = require("express");
const bodyParser = require("body-parser");
const db = require('./queries')

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", async function(req, res) {
    const day = new Date();
    let options = {month:"long"};
    let month = day.toLocaleString("en-US", options);
    const expenses = await db.getAllExpenses();
    const amounts = await db.getTotal();
    res.render("tracker", {todaysMonth: month, expenseList: expenses, amountList: amounts});
})

app.post("/", function(req, res) {
    db.createExpense(req, res)
    res.redirect("/")
})

app.listen(port, function() {
    console.log("Server started on port 8000");
})