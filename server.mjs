import express from 'express';
import db from './db.mjs'
const app = express()
const PORT = 3000


app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))


// Function to fetch and log all users from the users table
async function logAllUsers() {
  let conn;
  try {
    conn = await db.getConnection();

    // Execute the SQL query to fetch all users from the table
    const users = await conn.query('SELECT * FROM users');

    // Log the users
    console.log(users);
  } catch (err) {
    console.error('Error while fetching users:', err);
  } finally {
    if (conn) {
      conn.release(); // Release the connection back to the pool
    }
  }
}

// Call the function to log all users
// logAllUsers();

import lobbyRouter from './routes/lobby.mjs'

app.use('/api/lobby', lobbyRouter)

import connexionRouter from './routes/api.mjs'

app.use('/api', connexionRouter)

app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`))