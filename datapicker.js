$(function () {
    $('#datepicker').datetimepicker({
        format: 'ddd MM/DD/YYYY', 
        icons: {
            time: false,
            date: true,
            up: false,
            down: false,
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'fas fa-calendar-check',
            clear: 'fas fa-trash-alt',
            close: 'fas fa-times'
        }
    });

});
