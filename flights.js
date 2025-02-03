document.addEventListener('DOMContentLoaded', function () {
    const storedFlights = localStorage.getItem('flights');

    if (!storedFlights) {
        console.error('Flights data not found in localStorage');
        return;
    }

    const flights = JSON.parse(storedFlights);

    const flightContainer = document.getElementById('flightContainer');

    let flightCardsHTML = '<div class="row row-cols-1 row-cols-md-3 g-4">';

    flights.forEach((flight, index) => {
        const departureDate = new Date(flight.departure_date);
        const formattedDate = departureDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
        /*
            https://getbootstrap.com/docs/4.0/components/card/  
        */

        const flightInfo = `
    <div class="col mb-4">
        <div class="card h-100">
            <img src="Images/Plane.jpeg" class="card-img-top" alt="Plane">
            <div class="card-body">
                <h5 class="card-title">${flight.from_airport_name}-${flight.to_airport_name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${flight.from_airport_city}-${flight.to_airport_city}</h6>
                <p class="card-text"><strong>Departure Date:</strong> ${formattedDate} ${flight.departure_time}</p>
                <p class="card-text"><strong>Flight Time:</strong> ${flight.flight_time}</p>
                <p class="card-text"><strong>Price:</strong> ${flight.flight_price}</p>
                <a href="#" class="btn btn-outline-primary book-now-btn">Book Now</a>
            </div>
        </div>
    </div>
`;

        flightCardsHTML += flightInfo;

        if ((index + 1) % 3 === 0 || index === flights.length - 1) {
            flightCardsHTML += '</div>';
            if (index !== flights.length - 1) {
                flightCardsHTML += '<div class="row row-cols-1 row-cols-md-3 g-4">';
            }
        }
    });

    flightContainer.innerHTML = flightCardsHTML;

    // Book Now Button Click Event Listener
    const bookNowButtons = document.querySelectorAll('.book-now-btn');
    bookNowButtons.forEach((button, index) => {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            // Get departure time from the clicked card
            const departureTime = flights[index].departure_time;

            
            localStorage.setItem('selectedDepartureTime', departureTime);

            
            window.location.href = 'getCustomerInfo.html';
        });
    });
});