const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'expense_tracker',
    password: 'Harrypotter',
    port: 5432,
})

async function getAllExpenses() {
    const result = await pool.query('SELECT * FROM expenses ORDER BY id ASC')
    return result.rows;
  }

async function getTotal() {
    const result = await pool.query('SELECT amount FROM expenses ORDER BY id ASC')
    return result.rows;
}

async function createExpense(request, response) {
    const {date, amount, place, category} = request.body
    const result = await pool.query('INSERT INTO expenses (date, amount, place, category) VALUES ($1, $2, $3, $4) RETURNING *', [date, amount, place, category])
    console.log(result)

}

module.exports = {
    getAllExpenses,
    getTotal,
    createExpense,
}
