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

app.get('/citizenship', (req, res) => {

    const sqlQuery1 = 'select citizenship from citizenship';


    connection.query(sqlQuery1, (error, results) => {
        if (error) {
            console.error('Query Error for query1: ' + error);
            res.status(500).send('Database Error');
            return;
        }

        res.json(results);
    });
});
app.get('/flights', (req, res) => {
    // Extract parameters from the query string
    const selectedFrom = req.query.selectedFromCode;
    const selectedTo = req.query.selectedToCode;

    // Construct the SQL query based on user input
    const sqlQuery = `
    SELECT 
    airports.airport_name AS from_airport_name, 
    airports_to.airport_name AS to_airport_name, 
    flights.flight_time, 
    flights.departure_date, 
    flights.flight_price,
    airports.city AS from_airport_city,
    airports_to.city AS to_airport_city
FROM 
    flights
INNER JOIN 
    airports ON flights.from = airports.airportsid
INNER JOIN 
    airports AS airports_to ON flights.to = airports_to.airportsid
WHERE 
    flights.from = ? 
    AND flights.to = ?;

`;



    // Execute the SQL query with user input as parameters
    connection.query(sqlQuery, [selectedFrom, selectedTo], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Database Error');
            return;
        }

        // Check if any flights match the criteria
        if (results.length === 0) {
            res.status(404).send('No flights found matching the criteria.');

        } else {
            // Send the results back to the client in JSON format
            res.json(results);
        }
    });
});




//Execute the Server

const port = 3000;
app.listen(port, () => {
    console.log(`The Server execute at ${port} port.`);
});
