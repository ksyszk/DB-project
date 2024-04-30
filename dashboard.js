// $(document).ready(function () {
//     var settings = {
//         "url": "http://43.130.62.214:8080/admin/getaccountsbyemail",
//         "method": "POST",
//         "timeout": 0,
//         "data": JSON.stringify({
//             "adminToken": localStorage.getItem('adminToken')
//         }),
//     };

//     $.ajax(settings).done(function (response) {
//         console.log(response);

//         if (response.Status !== 0) {
//             alert(response.ErrorMsg);
//         }

//         $('#accountsTable').empty();
//         if (response.Status === 0 && response.Data) {
//             var accounts = response.Data.account_info;
//             if (!$.isEmptyObject(accounts)) {
//                 $.each(accounts, function (accountType, account) {
//                     if (account) {  // Check if the account type is not null
//                         var detailsButton = '<button class="btn btn-primary">Edit</button>';
//                         var row = '<tr>' +
//                             '<td>' + account.account_id + '</td>' +
//                             '<td>' + account.name + '</td>' +
//                             '<td>' + account.user_id + '</td>' +
//                             '<td>' + response.Data.user_info.Email + '</td>' +
//                             '<td>' + response.Data.user_info.FName + '</td>' +
//                             '<td>' + response.Data.user_info.LName + '</td>' +
//                             '<td>' + detailsButton + '</td>' +
//                             '</tr>';
//                         $('#accountsTable').append(row);
//                     }
//                 });
//             } else {
//                 $('#accountsTable').append('<tr><td colspan="7">No accounts found.</td></tr>');
//             }
//         } else {
//             $('#accountsTable').append('<tr><td colspan="7">No data available or error in response.</td></tr>');
//         }
//     }).fail(function (jqXHR, textStatus, errorThrown) {
//         // handle error
//         $('#accountsTable').append('<tr><td colspan="7">Error loading accounts.</td></tr>');

//         console.error("Request failed: " + textStatus + ", " + errorThrown);

//         if (errorThrown === "Unauthorized") {
//             alert("You're not logged in. Please sign in !");
//             window.location.href = "admin_signin.html";
//         }
//     });
// });


document.getElementById('logoutButton').addEventListener('click', function (e) {
    e.preventDefault();  // Prevent the default anchor behavior

    // Clear user session data 
    localStorage.clear();

    alert('You have been signed out.');

    // Redirect to the login page or homepage after logout
    window.location.href = 'admin_signin.html';
});


$(document).ready(function () {
    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        var searchData = $('#searchInput').val();

        var apiUrl = '';
        var dataPayload = {};

        if (searchData.includes('@')) {
            apiUrl = 'http://43.130.62.214:8080/admin/getaccountsbyemail';
            dataPayload = {
                "adminToken": localStorage.getItem('adminToken'),
                "email": searchData
            };
        } else {
            apiUrl = 'http://43.130.62.214:8080/admin/getaccountbyaccountid';
            dataPayload = {
                "adminToken": localStorage.getItem('adminToken'),
                "account_id": parseInt(searchData, 10) 
            };
        }

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
                var accounts = response.Data.account_info;
                var userinfo = response.Data.user_info;
                $.each(accounts, function (i, account) {
                    if (account === null) {
                        return true; 
                    }

                    var buttonUrl = '';
                    if(i === 'saving_account'){
                        buttonUrl = './update_saving.html?account_id=';
                    } else if(i === 'checking_account'){
                        buttonUrl = './update_checking.html?account_id=';
                    } else if(i === 'personal_loan_account'){
                        buttonUrl = './update_personal.html?account_id=';
                    } else if(i === 'home_loan_account'){
                        buttonUrl = './update_home.html?account_id=';
                    } else{
                        buttonUrl = './update_student.html?account_id=';
                    }

                    var detailsButton = `<button class="btn btn-primary" onclick="window.location.href='${buttonUrl}${account.account_id}&user_id=${userinfo.ID}&acc_name=${account.name}'">Edit</button>`;
                    var row = `<tr>
                        <td>${account.account_id}</td>
                        <td>${account.name}</td>
                        <td>${userinfo.ID}</td>
                        <td>${userinfo.Email}</td>
                        <td>${userinfo.FName}</td>
                        <td>${userinfo.LName}</td>
                        <td>${detailsButton}</td>
                    </tr>`;
                    $('#accountsTable').append(row);
                });
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // handle error
            console.error("Request failed: " + textStatus + ", " + errorThrown);

            if (errorThrown === "Unauthorized") {
                alert("You're not logged in. Please sign in !");
                window.location.href = "admin_signin.html";
            }
        });

    });
});

