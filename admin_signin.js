function signin(){
    let json = $('#signin_form').serialize();
        console.log('json: ', json);
        console.log("=============================");

        var email = $("input[id='floatingInput']").val();
        var password = $("input[id='floatingPassword']").val();
        console.log('email : ', email);
        console.log('password : ', password);

        var settings = {
            "url": "http://43.130.62.214:8080/admin/login",
            "method": "POST",
            "timeout": 0,
            "async": false,
            "xhrFields": {
                withCredentials: true
            },
            "headers": {
                "Content-Type": "application/json",
            },
            "data": JSON.stringify({
                "email": email,
                "password": password
            }),
        };

        $.ajax(settings).done(function (response) {
            if(response.Status !== 0){
                alert(response.ErrorMsg);
            }else{
                localStorage.setItem('adminToken', response.Data.adminToken);
                window.location.href = "dashboard.html";
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // handle error
            console.error("Request failed: " + textStatus + ", " + errorThrown);
        });

        return false;
}
