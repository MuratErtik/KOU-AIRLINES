const selectedCusNum = localStorage.getItem('selectedCusNum');

if (selectedCusNum && !isNaN(selectedCusNum)) {
    const cusInfoDiv = document.getElementById('cusInfo');


    for (let i = 0; i < parseInt(selectedCusNum); i++) {
        const formElement = document.createElement('form');
        formElement.className = 'row g-3 needs-validation';
        formElement.setAttribute('novalidate', '');
        /*
          https://getbootstrap.com/docs/4.3/components/forms/
        */


        formElement.innerHTML = `
          <h3>${i + 1}. Customer</h3>
          <div class="col-md-4">
                    <label for="customerName_${i}" class="form-label">First name</label>
                    <input type="text" class="form-control" id="customerName_${i}"  required>
                    <div class="invalid-feedback">
                      Please provide a name.
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="customerLastname_${i}" class="form-label">Last name</label>
                    <input type="text" class="form-control" id="customerLastname_${i}"  required>
                    <div class="invalid-feedback">
                      Please provide a lastname.

                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="customerMail_${i}" class="form-label">Email Adress</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text" id="inputGroupPrepend_${i}">@</span>
                      <input type="text" class="form-control" id="validationCustomMail_${i}" aria-describedby="inputGroupPrepend_${i}" required>
                      <div class="invalid-feedback">
                        Please choose a mail address.
                      </div>
                    </div>
                  </div>
                  
                  </div>
                  <div class="col-md-2">
                    <label for="customerCitizenship_${i}" class="form-label">Citizenship</label>
                    <div class="form-group">
                      <input type="text" class="form-control"  list="list-timezone-citizenship" id="input-datalist-citizenship_${i}">
                      <datalist id="list-timezone-citizenship"></datalist>
                  </div>
                    <div class="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  <div class="col-md-3">
                      <label for="customerPhone_${i}" class="form-label">Phone Number</label>
                      <div class="input-group" style="width: 300px;">
                          <input type="tel" class="form-control" id="validationCustomPhone_${i}" placeholder="Phone Number" required maxlength="10">
                          <div class="invalid-feedback">
                              Please provide a valid phone number (10 digits).
                          </div>
                      </div>
                  </div>
                  <br>
                  <div class="col-12">
                      <label for="validationCustomBirthdate_${i}" class="form-label">Birth Date</label>
                      <input type="date" class="form-control" id="validationCustomBirthdate_${i}" required>
                      <div class="invalid-feedback">
                          Please provide a valid date.
                      </div>
                  </div>
                  
                  <hr>
                  
          
          `;

        cusInfoDiv.appendChild(formElement);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const localStorageKeys = Object.keys(localStorage);

    localStorageKeys.forEach(function (key) {
        if (key.startsWith('customer_')) {
            localStorage.removeItem(key);
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function (event) {
        let missingFields = 0;
        const forms = document.querySelectorAll('.needs-validation');

        forms.forEach(function (form, index) {
            const inputs = form.querySelectorAll('input, select');
            let customerData = {};

            inputs.forEach(function (input) {
                input.classList.remove('is-invalid');

                if (!input.validity.valid && input.required) {
                    input.classList.add('is-invalid');
                    missingFields++;
                }

                customerData[input.id] = input.value;
            });

            if (missingFields === 0) {
                localStorage.setItem(`customer_${index}`, JSON.stringify(customerData));
            }
        });

        if (missingFields > 0) {
            event.preventDefault();

        }
    });


});
