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
        let json = $('#signup-form').serialize();
        console.log('json: ', json);
        console.log("=============================");

        var firstName = $("input[id='firstName']").val();
        var lastName = $("input[id='lastName']").val();
        var email = $("input[id='email']").val();
        var password = $("input[id='password']").val();
        var address = $("input[id='address']").val();
        var address2 = $("input[id='address2']").val();
        var city = $("input[id='city']").val();
        var country = $("select[id='country']").val();
        var state = $("select[id='state']").val();
        var zip = $("input[id='zip']").val();
        console.log('firstName : ', firstName);
        console.log('lastName : ', lastName);
        console.log("=======333333============");



        var settings = {
            "url": "http://43.130.62.214:8080/users/signup",
            "method": "POST",
            "timeout": 0,
            "async": false,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "confirmPassword": password,
                "address": address,
                "address2": address2,
                "city": city,
                "country": country,
                "state": state,
                "zip": zip
            }),
        };

        console.log(settings);
        console.log("=======4444444============");

        $.ajax(settings).done(function (response) {
            console.log(response);

            if(response.Status !== 0){
                alert(response.ErrorMsg);
            } else {
                window.location.href = "signin.html";
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // handle error
            console.error("Request failed: " + textStatus + ", " + errorThrown);
        });
    });
});
