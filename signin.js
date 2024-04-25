function test(){
    let json = $('#signin_form').serialize();
        console.log('json: ', json);
        console.log("=============================");

        var email = $("input[id='floatingInput']").val();
        var password = $("input[id='floatingPassword']").val();
        console.log('email : ', email);
        console.log('password : ', password);
        console.log("=======333333============");


        var settings = {
            "url": "http://43.130.62.214:8080/users/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify({
                "email": email,
                "password": password
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);

            if(response.Status !== 0){
                alert(response.ErrorMsg);
            }else{
                window.location.href = "checking-form.html";
            }
        });

        console.log("=======444444444444============");
        return false;
}
