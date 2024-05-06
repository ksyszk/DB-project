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
        "adminToken": localStorage.getItem('adminToken'),
        "account_id": parseInt(accountId)
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
            var account_info = response.Data.account_info.saving_account;

            $("input[id='address']").val(account_info.street);
            $("input[id='address2']").val(account_info.apart);
            $("input[id='city']").val(account_info.city);
            $("select[id='country']").val("United States");
            $("select[id='state']").val(account_info.state);
            $("input[id='zip']").val(account_info.zip);
            $("input[id='amount']").val(account_info.amount);
            $("input[id='interest_rate']").val(account_info.interest_rate);

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
        let json = $('#saving-form').serialize();
        console.log('json: ', json);
        console.log("=============================");

        var address = $("input[id='address']").val();
        var address2 = $("input[id='address2']").val();
        var city = $("input[id='city']").val();
        var country = $("select[id='country']").val();
        var state = $("select[id='state']").val();
        var zip = $("input[id='zip']").val();
        var amount = $("input[id='amount']").val();
        var interest_rate = $("input[id='interest_rate']").val();

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
                    "account_type": "S",
                    "amount": parseFloat(amount),
                    "street": address,
                    "apart": address2,
                    "city": city,
                    "country": country,
                    "state": state,
                    "zip": zip,
                    "user_id": parseInt(userId),
                    "name": accName,
                    "interest_rate": parseFloat(interest_rate),
                }
            }),
        };

        console.log(settings);

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.Status !== 0) {
                alert(response.ErrorMsg);
            } else {
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