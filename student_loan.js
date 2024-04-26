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
        let json = $('#student_loan_form').serialize();
        // console.log('json: ', json);
        // console.log("=============================");

        var lamount = $("input[id='lamount']").val();
        var lmonth = $("select[id='lmonth']").val();
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

        var settings = {
            "url": "http://43.130.62.214:8080/account/test",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "lamount": lamount,
                "lmonth": lmonth,
                "eduinstitute": eduinstitute,
                "sid": sid,
                "grad_status": grad_status,
                "graduationMonth": graduationMonth,
                "graduationYear": graduationYear,
                "address": address,
                "address2": address2,
                "city": city,
                "country": country,
                "state": state,
                "zip": zip,
                "userToken": localStorage.getItem('user_token')
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);

            if(response.Status !== 0){
                alert(response.ErrorMsg);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            // handle error
            console.error("Request failed: " + textStatus + ", " + errorThrown); 
            
            if(errorThrown === "Unauthorized"){
                alert("You're not logged in. Please sign in !");
                window.location.href = "signin.html";
            }
        });


    });
});


document.getElementById('logoutButton').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent the default anchor behavior

    // Clear user session data 
    localStorage.clear(); 

    alert('You have been signed out.');

    // Redirect to the login page or homepage after logout
    window.location.href = 'signin.html'; 
});
