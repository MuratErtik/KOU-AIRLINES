(function () {
    'use strict'


    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


fetch('http://localhost:3000/citizenship')
    .then(response => response.json())
    .then(citizenship => {
        const datalist = document.getElementById('list-timezone-citizenship');


        citizenship.forEach(item => {

            const optionFrom = document.createElement('option');
            optionFrom.value = ` ${item.citizenship}`;
            datalist.appendChild(optionFrom);


        });
    })
    .catch(error => {
        console.error('No data:', error);
    });
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function (event) {
        let missingFields = 0;
        const forms = document.querySelectorAll('.needs-validation');

        forms.forEach(function (form) {
            // Remove the 'is-invalid' class from all input and select elements in the form
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(function (input) {
                input.classList.remove('is-invalid');
            });

            if (!form.checkValidity()) {
                missingFields++;

                inputs.forEach(function (input) {
                    if (!input.validity.valid && input.required) {
                        input.classList.add('is-invalid');
                    }
                });
            }
        });

        if (missingFields > 0) {
            event.preventDefault();
            alert('Please fill in all required fields.');
        } else {
            alert('All fields are filled! Please proceed to the next step.');
            window.location.href = 'planeSeat.html';
        }
    });
});      