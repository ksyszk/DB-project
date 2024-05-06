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
        let json = $('#transfer-form').serialize();

        var from_account_id = $("input[id='from_account_id']").val();
        var to_account_id = $("input[id='to_account_id']").val();
        var amount = $("input[id='amount']").val();

        var settings = {
            "url": "http://43.130.62.214:8080/account/transaction",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "from_account_id": parseInt(from_account_id),
                "to_account_id": parseInt(to_account_id),
                "amount": parseFloat(amount),
                "userToken": localStorage.getItem('user_token')
            }),
        };

        console.log(settings);

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.Status !== 0) {
                alert(response.ErrorMsg);
            } else {
                alert("You have created an transaction!");
                window.location.href = "user_center.html";
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            // handle error
            console.error("Request failed: " + textStatus + ", " + errorThrown);

            // if (errorThrown === "Unauthorized") {
            //     alert("You're not logged in. Please sign in !");
            //     window.location.href = "signin.html";
            // }
        });


    });
});


document.getElementById('logoutButton').addEventListener('click', function (e) {
    e.preventDefault();  // Prevent the default anchor behavior

    // Clear user session data 
    localStorage.clear();

    alert('You have been signed out.');

    // Redirect to the login page or homepage after logout
    window.location.href = 'signin.html';
});