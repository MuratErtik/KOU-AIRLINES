// Select the Pay button and attach a click event listener
var click_pay = document.querySelector(".click-pay");
click_pay.addEventListener('click', function () {
    // Validate the form
    if (validateform()) {
        const localStorageKeys = Object.keys(localStorage);


        const customerKeys = localStorageKeys.filter(function (key) {
            return key.startsWith('customer_');
        }).sort(function (key1, key2) {
            const id1 = parseInt(key1.substring(9));
            const id2 = parseInt(key2.substring(9));
            return id1 - id2;
        });


        const sortedCustomerData = [];

        customerKeys.forEach(function (key) {
            const customerData = JSON.parse(localStorage.getItem(key));
            const customerId = key.substring(9);


            sortedCustomerData.push({
                customerData: customerData
            });
        });

        console.log(sortedCustomerData);
        const url = 'http://localhost:3000/insertData';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sortedCustomerData)
        };
        //console.log(requestOptions.body);
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data sent successfullly:', data);
                //if the process has been successfull continue here!
            })
            .catch(error => {
                console.error('Error Data did not send:', error);
                //if the error occured examine here!
            });




        const storedArrayString = localStorage.getItem('selectedSeats');

        if (storedArrayString) {
            const storedSeatArray = JSON.parse(storedArrayString);

            const storedDepartureTime = localStorage.getItem('selectedDepartureTime');
            const storedFromCode = localStorage.getItem('selectedFromCode');
            const storedToCode = localStorage.getItem('selectedToCode');
            const storedDate = localStorage.getItem('selectedDate');

            console.log('Stored Departure Time:', storedDepartureTime);
            console.log('Stored From Code:', storedFromCode);
            console.log('Stored To Code:', storedToCode);
            console.log('Stored Date:', storedDate);
            console.log(storedSeatArray);
            const dataToSend = {
                storedSeatArray: storedSeatArray,
                storedToCode: storedToCode,
                storedFromCode: storedFromCode,
                storedDepartureTime: storedDepartureTime,
                storedDate: storedDate
            };

            if (storedDepartureTime && storedFromCode && storedToCode && storedDate && storedSeatArray) {
                const url = 'http://localhost:3000/updateSeat';
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataToSend)

                };


                fetch(url, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Seat update successful:', data);
                        //if the process has been successfull continue here!
                    })
                    .catch(error => {
                        console.error('Seat update error:', error);

                    });
            } else {
                console.log('One or more stored values are missing or empty.');

            }

        } else {
            console.log('No data found in localStorage.');
        }



    } else {
        // If form is not valid, alert the user to fill in all required fields
        alert("Please fill in all required fields.");
    }


});

// Validate the form and return true if all required fields are filled
function validateform() {
    var validate = true;
    var validate_inputs = document.querySelectorAll(".right-side input");

    validate_inputs.forEach(function (input_valid) {
        input_valid.classList.remove('warning');
        if (input_valid.hasAttribute('required')) {
            if (input_valid.value.trim() === "") {
                validate = false;
                input_valid.classList.add('warning');
            }
        }
    });



    window.location.href = 'finalPage.html';

    return validate;
}
