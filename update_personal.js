function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const accountId = getQueryParam('account_id');
const userId = getQueryParam('user_id');
const accName = getQueryParam('acc_name');

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


$(document).ready(function () {
    $("#submit").click(function () {
        let json = $('#personal_loan_form').serialize();

        var amount = $("input[id='lamount']").val();
        var month = $("input[id='lmonth']").val();
        var address = $("input[id='address']").val();
        var address2 = $("input[id='address2']").val();
        var city = $("input[id='city']").val();
        var country = $("select[id='country']").val();
        var state = $("select[id='state']").val();
        var zip = $("input[id='zip']").val();
        var rate = $("input[id='rate']").val();
        var payment = $("input[id='payment']").val();

        var settings = {
            "url": "http://43.130.62.214:8080/admin/updateaccount",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "adminToken": localStorage.getItem('adminToken'),
                "account_id": parseInt(accountId),
                "update_data": {
                    "account_id": parseInt(accountId),
                    "account_type": "L",
                    "amount": parseFloat(amount),
                    "month": month,
                    "street": address,
                    "apart": address2,
                    "city": city,
                    "country": country,
                    "state": state,
                    "zip": zip,
                    "type": "L",
                    "user_id": parseInt(userId),
                    "name": accName,
                    "rate": parseFloat(rate),
                    "payment": payment,
                }
            }),
        };

        console.log(settings);

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.Status !== 0) {
                alert(response.ErrorMsg);
            } else{
                alert("Update successfully!");
                window.location.href = "dashboard.html";
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // handle error
            console.error("Request failed: " + textStatus + ", " + errorThrown);
        });


    });
});

document.getElementById('logoutButton').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent the default anchor behavior

    // Clear user session data 
    localStorage.clear(); 

    alert('You have been signed out.');
    
    // Redirect to the login page or homepage after logout
    window.location.href = 'admin_signin.html'; 
});