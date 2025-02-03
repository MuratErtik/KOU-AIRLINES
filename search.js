//ALERT
function validateForm() {
    var from = document.getElementById('input-datalist-from').value;
    var to = document.getElementById('input-datalist-to').value;
    var date = document.getElementById('datepicker').value;
    var customer = document.getElementById('numberInput').value;

    if (from === '' || to === '' || date === '' || customer === '0') {
        alert('Please provide all required information for your flight by filling out all necessary fields.');
        return false;
    }

    return true;
}


// SEARCH BUTTON
document.getElementById('searchButton').addEventListener('click', function () {
    if (validateForm()) {
        var from = document.getElementById('input-datalist-from').value;
        var to = document.getElementById('input-datalist-to').value;
        var date = selectedDate;
        var customer = document.getElementById('numberInput').value;
        function extractCodeFromAirportName(airportName) {
            const startIndex = airportName.indexOf('(');
            const endIndex = airportName.indexOf(')');

            if (startIndex !== -1 && endIndex !== -1) {
                return airportName.slice(startIndex + 1, endIndex).trim();
            }

            return '';
        }
        selectedFromCode = extractCodeFromAirportName(from);
        selectedToCode = extractCodeFromAirportName(to);
        console.log(selectedFromCode);
        console.log(selectedToCode);
        console.log(date);



        //Save the Choices in localStorage
        localStorage.setItem('selectedFromCode', selectedFromCode);
        localStorage.setItem('selectedToCode', selectedToCode);
        localStorage.setItem('selectedDate', date);
        localStorage.setItem('selectedCusNum', customer);


        var url = `http://localhost:3000/flights?selectedFromCode=${selectedFromCode}&selectedToCode=${selectedToCode}&selectedDate=${date}`;


        // Fetch flights data from the server
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(flights => {
                // Handle the response (flights data) here
                localStorage.setItem('flights', JSON.stringify(flights));
                console.log('Flights:', flights);
                window.location.href = 'Flights.html';
            })
            .catch(error => {
                console.error('Error fetching flights:', error);
                // Handle errors here (e.g., show an alert to the user)
                alert('There was no flight found matching your search criteria. Please try again.');
                window.location.href = 'KOU_AIRLINES_Main_Page.html';
            });



    }
});


