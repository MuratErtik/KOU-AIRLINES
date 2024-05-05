const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// CORS settings
app.use(cors());

app.use(express.json());




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
    const selectedDate = req.query.selectedDate;

    // Construct the SQL query based on user input
    const sqlQuery = `
    SELECT 
    airports.airport_name AS from_airport_name, 
    airports_to.airport_name AS to_airport_name, 
    flights.flight_time, 
    flights.departure_date, 
    flights.departure_time,
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
    AND flights.to = ?
    AND  DATE(departure_date)= ? ;

`;



    // Execute the SQL query with user input as parameters
    connection.query(sqlQuery, [selectedFrom, selectedTo, selectedDate], (error, results) => {
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

app.get('/seats', (req, res) => {
    // Extract parameters from the query string

    const selectedDepartureTime = req.query.selectedDepartureTime;
    const selectedFrom = req.query.selectedFromCode;
    const selectedTo = req.query.selectedToCode;


    // Construct the SQL query based on user input
    const sqlQuery = `
    SELECT seat FROM seat
    WHERE state=0 AND 
    flightid=(select flightsid from flights WHERE departure_time = ? AND flights.from = ? AND flights.to = ?);
`;



    // Execute the SQL query with user input as parameters
    connection.query(sqlQuery, [selectedDepartureTime, selectedFrom, selectedTo], (error, results) => {
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
app.get('/flightsInfo', (req, res) => {
    const selectedDepartureTime = req.query.selectedDepartureTime;
    const selectedFrom = req.query.selectedFromCode;
    const selectedTo = req.query.selectedToCode;
    

    const sqlQuery = `
    SELECT 
    airports.airport_name AS from_airport_name, 
    airports_to.airport_name AS to_airport_name, 
    flights.flight_time, 
    flights.departure_date, 
    flights.departure_time,
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
    departure_time = ? AND
    flights.from = ? AND
    flights.to = ?
    `;

    connection.query(sqlQuery, [selectedDepartureTime, selectedFrom, selectedTo], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Database Error');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('No flights found matching the criteria.');
        } else {
            const flight = results[0]; // Assume we're interested in the first flight returned

            // Construct the HTML content using flight details
            const departureDate = new Date(flight.departure_date);
            

           

            const formattedDate = departureDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
            const cardHtml = `
                <div id="cardInfo" class="col-md-4" style="margin-left: 550px; margin-top: -900px;background-color: #F3FBFF">
                    <div class="card" style="width: 190%; height: 100%;">
                        <div class="card-body">
                            <h5 class="card-title">${flight.from_airport_name} - ${flight.to_airport_name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${flight.from_airport_city} to ${flight.to_airport_city}</h6>
                            <p class="card-text">
                                Departure Date: ${formattedDate}<br>
                                Departure Time: ${flight.departure_time}<br>
                                Flight Time: ${flight.flight_time} hours<br>
                                Price per Person: ${flight.flight_price}TL
                            </p>
                            
                        </div>
                    </div>
                </div>
            `;

            // Send the constructed HTML as the response
            res.send(cardHtml);
        }
    });
});
app.post('/insertData', (req, res) => {
    const sortedCustomerData = req.body;
    console.log(sortedCustomerData);

    // Array to store promises for all database operations
    const insertionPromises = [];

    for (let i = 0; i < sortedCustomerData.length; i++) {
        const customer = sortedCustomerData[i].customerData;
        const mail = customer[`validationCustomMail_${i}`];

        const sqlSelect = `
            SELECT mail FROM customers WHERE mail = ?
        `;

        // Create a promise to query the database for existing email
        const checkEmailPromise = new Promise((resolve, reject) => {
            connection.query(sqlSelect, [mail], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        insertionPromises.push(
            checkEmailPromise.then((results) => {
                if (results.length > 0) {
                    console.log(`This record already exists: ${mail}`);
                    return Promise.resolve(null); // Skip insertion
                } else {
                    const sqlInsert = `
                        INSERT IGNORE INTO customers (customer_surname, customer_name, citizenshipid, birthdate, mail, phone_number)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;

                    // Insert data if email does not exist
                    return new Promise((resolve, reject) => {
                        connection.query(sqlInsert, [
                            customer[`customerLastname_${i}`],
                            customer[`customerName_${i}`],
                            customer[`input-datalist-citizenship_${i}`],
                            customer[`validationCustomBirthdate_${i}`],
                            mail,
                            customer[`validationCustomPhone_${i}`]
                        ], (error, insertResult) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(insertResult);
                            }
                        });
                    });
                }
            }).catch((error) => {
                console.error('DB operation error:', error);
                return Promise.resolve(null); // Resolve with null if an error occurs
            })
        );
    }

    // Wait for all promises to resolve
    Promise.all(insertionPromises).then((results) => {
        console.log('All database operations completed:', results);
        res.send('Data inserted or skipped successfully');
    }).catch((error) => {
        console.error('Promise error:', error);
        res.status(500).send('Internal Server Error');
    });
});

app.post('/updateSeat', (req, res) => {
    const storedSeatArray = req.body.storedSeatArray;
    const storedToCode = req.body.storedToCode;
    const storedFromCode = req.body.storedFromCode;
    const storedDepartureTime = req.body.storedDepartureTime;
    const storedDate = req.body.storedDate;




    const idArray = Object.values(storedSeatArray).map(item => item.id);




    for (let i = 0; i < idArray.length; i++) {
        console.log(idArray[i]);


        const sql = `
            UPDATE seat
            SET state = 0
            WHERE  seat = ? AND
            flightid = (
                SELECT flightsid FROM flights
                WHERE flights.to = ?
                AND flights.from = ?
                AND departure_time = ?
                AND departure_date = ?
                
            )
        `;

        connection.query(sql, [
            idArray[i],
            storedToCode,
            storedFromCode,
            storedDepartureTime,
            storedDate,


        ], (error, results) => {
            if (error) {
                console.error('DB update Error!:', error);
            } else {
                console.log('Data has been updated successfully:', results);

            }
        });
    }
});
app.post('/insertBooking', (req, res) => {

    const storedSeatArray = req.body.storedSeatArray;
    const sortedCustomerData = req.body.getCustomerData;
    const storedToCode = req.body.storedToCode;
    const storedFromCode = req.body.storedFromCode;
    const storedDepartureTime = req.body.storedDepartureTime;
    const storedDate = req.body.storedDate;
    const idArray = Object.values(storedSeatArray).map(item => item.id);

    for (let i = 0; i < idArray.length; i++) {
        console.log(idArray[i]);
        const customer = sortedCustomerData[i].customerData;
        console.log(customer);

        const mail = customer[`validationCustomMail_${i}`];
        console.log(mail);
        const bookingid = storedFromCode + storedToCode + storedDate + storedDepartureTime +'-' +idArray[i];

        const sql = `insert into booking(bookingid,Customerid,seatid) values(
            ?,
            (select customerid from customers where mail = ?),
            (select seatid from seat where seat= ? and flightid = (
                SELECT flightsid FROM flights
                WHERE flights.to = ?
                AND flights.from = ?
                AND departure_time = ?
                AND departure_date = ?
                
            ))
        )
            `

        connection.query(sql, [

            bookingid,
            mail,
            idArray[i],
            storedToCode,
            storedFromCode,
            storedDepartureTime,
            storedDate


        ], (error, results) => {
            if (error) {
                console.error('DB Insert booking Error!:', error);
            } else {
                console.log(' Booking Data has been updated successfully:', results);

            }
        });
    }
});


//Execute the Server

const port = 3000;
app.listen(port, () => {
    console.log(`The Server execute at ${port} port.`);
});
