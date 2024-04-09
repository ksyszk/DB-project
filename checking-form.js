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
    $("#checking-form").submit(function () {
        let json = $('#checking-form').serialize();
        console.log('json: ', json);
        console.log("=============================");

        var email = $("input[id='firstName']").val();
        var password = $("input[id='lastName']").val();
        console.log('email : ', email);
        console.log('password : ', password);
        console.log("=======333333============");


        var settings = {
            "url": "http://43.130.62.214:8080/users/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": email,
                "password": password,
                "confirmPassword": password
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });


    });
});


$(document).ready(function () {
    var queryString = window.location.search;
    var params = {};

    if (queryString[0]=="?"){
        queryString = queryString.substring(1);
    }

    if (queryString) {
        var pairs = queryString.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            params[pair[0]] = pair[1];
        }
    }
    console.log(333333333333)
    console.log(params)

    if (!params['is_modify']) {
        return true;
    }

    // TODO suppose get data from server
    let data = {
        "address": "Address_11111111111111111",
        "address2": "Address_22222222222222"
    }
    if (!data) {
        return true;
    }
    console.log(44444444444444)
    $("nobr[id='form_title']").text("Modification");
    $("input[id='address']").val(data['address'])
    $("input[id='address2']").val(data['address2'])

    $("div[id='checking-form-div']").append('<div class="col-12">\n' +
        '                                <label for="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>\n' +
        '                                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">\n' +
        '                            </div>')
})