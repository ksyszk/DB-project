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

function init() {
    apiUrl = 'http://43.130.62.214:8080/admin/getaccountbyaccountid';
    dataPayload = {
        "adminToken": localStorage.getItem('adminToken'), "account_id": parseInt(accountId)
    };

    var settings = {
        "url": apiUrl,
        "method": "POST",
        "timeout": 0,
        "data": JSON.stringify(dataPayload),
        "contentType": "application/json",
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#accountsTable').empty();
        if (response.length === 0) {
            alert('No results found.');
        } else {
            var account_info = response.Data.account_info.student_loan_account;

            $("input[id='address']").val(account_info.street);
            $("input[id='address2']").val(account_info.apart);
            $("input[id='city']").val(account_info.city);
            $("select[id='country']").val("United States");
            $("select[id='state']").val(account_info.state);
            $("input[id='zip']").val(account_info.zip);
            $("input[id='lamount']").val(account_info.amount);
            $("input[id='lmonth']").val(account_info.month);
            $("input[id='eduinstitute']").val(account_info.edu_institute);
            $("input[id='sid']").val(account_info.student_id);
            $("select[id='grad_status']").val(account_info.grad_status);
            $("select[id='graduationMonth']").val(account_info.expect_grad_month);
            $("select[id='graduationYear']").val(account_info.expect_grad_year);
            $("input[id='rate']").val(account_info.rate);
            $("input[id='payment']").val(account_info.payment);

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // handle error
        console.error("Request failed: " + textStatus + ", " + errorThrown);

        if (errorThrown === "Unauthorized") {
            alert("You're not logged in. Please sign in !");
            window.location.href = "admin_signin.html";
        }
    });
}

$(document).ready(function () {
    init();

    $("#submit").click(function () {
        let json = $('#student_loan_form').serialize();

        var amount = $("input[id='lamount']").val();
        var month = $("input[id='lmonth']").val();
        var eduinstitute = $("input[id='eduinstitute']").val();
        var sid = $("input[id='sid']").val();
        var grad_status = $("select[id='grad_status']").val();
        var graduationMonth = $("select[id='graduationMonth']").val();
        var graduationYear = $("select[id='graduationYear']").val();
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
                    "edu_institute": eduinstitute,
                    "expect_grad_month": graduationMonth,
                    "expect_grad_year": graduationYear,
                    "grad_status": grad_status,
                    "id": parseInt(accountId),
                    "student_id": sid,
                    "street": address,
                    "apart": address2,
                    "city": city,
                    "country": country,
                    "state": state,
                    "zip": zip,
                    "type": "S",
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

document.getElementById('logoutButton').addEventListener('click', function (e) {
    e.preventDefault();  // Prevent the default anchor behavior

    // Clear user session data 
    localStorage.clear();

    alert('You have been signed out.');

    // Redirect to the login page or homepage after logout
    window.location.href = 'admin_signin.html';
});