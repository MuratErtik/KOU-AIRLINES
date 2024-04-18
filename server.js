const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// CORS settings
app.use(cors());




// MySQL connection information
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'flights_ticket_project'
});


connection.connect((err) => {
    if (err) {
        console.error('While connect to MYSQL database the error occurred: ' + err.stack);
        return;
    }
    console.log('Connect the successfully.');
});


app.get('/users', (req, res) => {
    
    const sqlQuery1 = 'select airport_name,airportsid from airports';

    
    connection.query(sqlQuery1, (error, results) => {
        if (error) {
            console.error('Query Error for query1: ' + error);
            res.status(500).send('Database Error');
            return;
        }
        
        //result of queries send client via JSON
        res.json(results);
    });
});


//Execute the Server

const port = 3000;
app.listen(port, () => {
    console.log(`The Server execute at ${port} port.`);
});
