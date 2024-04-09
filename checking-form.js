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
