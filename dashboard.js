$(document).ready(function () {
    var settings = {
        "url": "http://43.130.62.214:8080/admin/dashboard",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "adminToken": localStorage.getItem('adminToken')
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        if (response.Status !== 0) {
            alert(response.ErrorMsg);
        }

        const dashboard_data = response.Data;
        const dashboardlist = $('#dashboardlist');
        dashboardlist.empty();

        const cardHtml = `
                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Number of Checking Account</h3>
                                    <h2>${dashboard_data.checking_account_num}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Number of Saving Account</h3>
                                    <h2>${dashboard_data.saving_account_num}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Number of Personal Loan Account</h3>
                                    <h2>${dashboard_data.personal_loan_account_num}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Number of Home Loan Account</h3>
                                    <h2>${dashboard_data.home_loan_account_num}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Number of Student Loan Account</h3>
                                    <h2>${dashboard_data.student_loan_account_num}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Total Checking Deposit</h3>
                                    <h2>$${dashboard_data.total_checking_deposit}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Total Saving Deposit</h3>
                                    <h2>$${dashboard_data.total_saving_deposit}</h2>
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-3.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h3 class="pt-1 mt-2 mb-4 fw-bold">Total Loan Amount</h3>
                                    <h2>$${dashboard_data.total_loan_amount}</h2>
                                </div>
                            </div>
                        </div>
                    `;
        dashboardlist.append(cardHtml);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // handle error
        console.error("Request failed: " + textStatus + ", " + errorThrown);

        if (errorThrown === "Unauthorized") {
            alert("You're not logged in. Please sign in !");
            window.location.href = "admin_signin.html";
        }
    });
});


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
                    if (i === 'saving_account') {
                        buttonUrl = './update_saving.html?account_id=';
                    } else if (i === 'checking_account') {
                        buttonUrl = './update_checking.html?account_id=';
                    } else if (i === 'personal_loan_account') {
                        buttonUrl = './update_personal.html?account_id=';
                    } else if (i === 'home_loan_account') {
                        buttonUrl = './update_home.html?account_id=';
                    } else {
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

