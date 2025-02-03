fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const datalistFrom = document.getElementById('list-timezone-from');
                const datalistTo = document.getElementById('list-timezone-to');

                users.forEach(item => {
                    // add From datalist
                    const optionFrom = document.createElement('option');
                    optionFrom.value = `${item.airport_name} (${item.airportsid})`;
                    datalistFrom.appendChild(optionFrom);

                    // add To datalist
                    const optionTo = document.createElement('option');
                    optionTo.value = `${item.airport_name} (${item.airportsid})`;
                    datalistTo.appendChild(optionTo);
                });
            })
            .catch(error => {
                console.error('No data:', error);
            });


        $(document).ready(function () {
            function updateDisplay(value) {
                $('#numberInput').val(value);
            }

            $('#plusBtn').click(function () {
                var value = parseInt($('#numberInput').val());
                if (value < 5) {
                    updateDisplay(value + 1);
                }
            });

            $('#minusBtn').click(function () {
                var value = parseInt($('#numberInput').val());
                if (value > 0) {
                    updateDisplay(value - 1);
                }
            });

            updateDisplay(0);
        });




        $('#datepicker').datetimepicker({
            format: 'YYYY-MM-DD',
            minDate: moment().startOf('day'),
            icons: {
                time: 'far fa-clock',
                date: 'far fa-calendar',
                up: 'fas fa-chevron-up',
                down: 'fas fa-chevron-down',
                previous: 'fas fa-chevron-left',
                next: 'fas fa-chevron-right',
                today: 'fas fa-calendar-check',
                clear: 'fas fa-trash',
                close: 'fas fa-times'
            }
        });

        let selectedDate;

        // Add event listener to update selectedDate when the datepicker value changes
        $('#datepicker').on('change.datetimepicker', function (e) {
            const currentDate = moment().startOf('day');

            const selectedDateTime = e.date.startOf('day');

            if (selectedDateTime.isBefore(currentDate)) {
                $(this).datetimepicker('date', currentDate);
                $(this).addClass('disabled');
                $(this).css('background-color', 'red');
                $(this).css('cursor', 'not-allowed');
            } else {
                selectedDate = selectedDateTime.format('YYYY-MM-DD');
                $(this).removeClass('disabled');
                $(this).css('background-color', '');
                $(this).css('cursor', '');
            }
        });






