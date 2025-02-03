document.addEventListener('DOMContentLoaded', function () {
    const storedArrayString = localStorage.getItem('selectedSeats');
    const localStorageKeys = Object.keys(localStorage);
    const storedDepartureTime = localStorage.getItem('selectedDepartureTime');
    const storedFromCode = localStorage.getItem('selectedFromCode');
    const storedToCode = localStorage.getItem('selectedToCode');
    const storedDate = localStorage.getItem('selectedDate');


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



    if (storedArrayString) {
        const storedSeatArray = JSON.parse(storedArrayString);
        const getCustomerData = sortedCustomerData;
        console.log(sortedCustomerData);







        const dataToSend = {
            storedSeatArray: storedSeatArray,
            getCustomerData: getCustomerData,
            storedToCode: storedToCode,
            storedFromCode: storedFromCode,
            storedDepartureTime: storedDepartureTime,
            storedDate: storedDate
        };

        if (getCustomerData && storedSeatArray) {
            const url = 'http://localhost:3000/insertBooking';
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
                    console.log('Insert booking successful:', data);
                    //if the process has been successfull continue here!
                })
                .catch(error => {
                    console.error('Insert booking error:', error);

                });
        } else {
            console.log('One or more stored values are missing or empty.!!');

        }

    } else {
        console.log('No data found in localStorage.!');
    }
}
);
