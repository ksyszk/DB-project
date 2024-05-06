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
    $("#home_loan_form").submit(function () {
        let json = $('#home_loan_form').serialize();

        var lamount = $("input[id='lamount']").val();
        var lmonth = $("input[id='lmonth']").val();
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
        var country = $("input[id='country']").val();
        var state = $("input[id='state']").val();
        var zip = $("input[id='zip']").val();

        var settings = {
            "url": "http://43.130.62.214:8080/users/addhomeloan",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "lamount": lamount,
                "lmonth": lmonth,
                "buildYear": buildYear,
                "insu_acc_no": insu_acc_no,
                "year_insu_pre": year_insu_pre,
                "insu_name": insu_name,
                "insu_address": insu_address,
                "insu_city": insu_city,
                "insu_country": insu_country,
                "insu_state": insu_state,
                "insu_zip": insu_zip,
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
            } else{
                alert("You have created the account!");
                window.location.href = "user_center.html";
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


// $(document).ready(function () {
//     var queryString = window.location.search;
//     var params = {};

//     if (queryString[0]=="?"){
//         queryString = queryString.substring(1);
//     }

//     if (queryString) {
//         var pairs = queryString.split('&');
//         for (var i = 0; i < pairs.length; i++) {
//             var pair = pairs[i].split('=');
//             params[pair[0]] = pair[1];
//         }
//     }
//     console.log(333333333333)
//     console.log(params)

//     if (!params['is_modify']) {
//         return true;
//     }

//     // TODO suppose get data from server
//     let data = {
//         "address": "Address_11111111111111111",
//         "address2": "Address_22222222222222"
//     }
//     if (!data) {
//         return true;
//     }
//     console.log(44444444444444)
//     $("nobr[id='form_title']").text("Modification");
//     $("input[id='address']").val(data['address'])
//     $("input[id='address2']").val(data['address2'])

//     $("div[id='checking-form-div']").append('<div class="col-12">\n' +
//         '                                <label for="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>\n' +
//         '                                <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">\n' +
//         '                            </div>')
// })