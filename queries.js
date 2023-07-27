const Pool = require('pg').Pool;
// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'expense_tracker',
//     password: 'Harrypotter',
//     port: 8000,
// })

const createExpense = (request, response) => {
    const pool = new Pool({
        user: 'me',
        host: 'localhost',
        database: 'expense_tracker',
        password: 'Harrypotter',
        port: 8000,
    })
    const {date, amount, place, category} = request.body
    console.log(date);
    console.log(amount);
    console.log(place);
    console.log(category);
    pool.query('INSERT INTO expenses (date, amount, place, category) VALUES ($1, $2, $3, $4) RETURNING *', [date, amount, place, category], (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results)
        response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

module.exports = {
    createExpense,
}
//{results.rows[0].id}
