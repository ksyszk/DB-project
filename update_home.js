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
        let json = $('#home_loan_form').serialize();
        console.log('json: ', json);
        console.log("=============================");

        var amount = $("input[id='lamount']").val();
        var month = $("input[id='lmonth']").val();
        var buildYear = $("input[id='buildYear']").val();
        var insu_acc_no = $("input[id='insu_acc_no']").val();
        var year_insu_pre = $("input[id='year_insu_pre']").val();
        var insu_name = $("input[id='insu_name']").val();
        var insu_address = $("input[id='insu_address']").val();
        var insu_city = $("input[id='insu_city']").val();
        var insu_country = $("input[id='insu_country']").val();
        var insu_state = $("input[id='insu_state']").val();
        var insu_zip = $("input[id='insu_zip']").val();
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
                    "build_year": buildYear,
                    "insu_acc_no": insu_acc_no,
                    "year_insu_pre": year_insu_pre,
                    "insu_name": insu_name,
                    "insu_address": insu_address,
                    "insu_city": insu_city,
                    "insu_country": insu_country,
                    "insu_state": insu_state,
                    "insu_zip": insu_zip,
                    "street": address,
                    "apart": address2,
                    "city": city,
                    "country": country,
                    "state": state,
                    "zip": zip,
                    "type": "H",
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