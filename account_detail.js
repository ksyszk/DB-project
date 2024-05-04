function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const accountId = getQueryParam('account_id');
const accountType = getQueryParam('account_type');


$(document).ready(function () {
    // init data
    let settings = {
        "url": "http://43.130.62.214:8080/account/usercenter",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "userToken": localStorage.getItem('user_token'),
        }),
    };

    $.ajax(settings).done(function (response) {
        const accountDetails = $('#accountDetails');
        const accountData = response.Data.account_info;

        $.each(accountData, function (key, account) {
            if (account === null) {
                return true;
            }

            if (account.id.toString() === accountId) {
                let accountType = account.account_type;
                if (accountType === 'L') {
                    switch (account.type) {
                        case 'L':
                            accountType = 'Personal Loan';
                            break;
                        case 'S':
                            accountType = 'Student Loan';
                            break;
                        case 'H':
                            accountType = 'Home Loan';
                            break;
                    }
                } else {
                    accountType = accountType === 'S' ? 'Saving Account' : 'Checking Account';
                }

                let features = `
                <h3 align="center">${account.name}</h3>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#people-circle"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Account Type</h3>
                            <p>  </p>
                            <p>${accountType}</p>
                        </div>
                    </div>

                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#collection"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Account ID</h3>
                            <p>  </p>
                            <p>${account.id}</p>
                        </div>
                    </div>

                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Billing Address</h3>
                            <p>  </p>
                            <p>${account.street}</p>
                            ${account.apart ? `<p>${account.apart}</p>` : ''}
                            <p>${account.city}, ${account.state}, ${account.zip}</p>
                        </div>
                    </div>

                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#table"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Amount</h3>
                            <p>  </p>
                            <p>$${account.amount}</p>
                        </div>
                    </div>
                `;

                if (account.interest_rate) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Interest Rate</h3>
                            <p>  </p>
                            <p>${account.interest_rate}%</p>
                        </div>
                    </div>
                    `;
                }
                if (account.service_charge) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#chevron-right"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Service Charge</h3>
                            <p>  </p>
                            <p>${account.service_charge}</p>
                        </div>
                    </div>
                    `;
                }
                if (account.rate) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Rate</h3>
                            <p>  </p>
                            <p>${account.rate}%</p>
                        </div>
                    </div>
                    `;
                }
                if (account.payment) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#table"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Monthly Payment</h3>
                            <p>  </p>
                            <p>$${account.payment}</p>
                        </div>
                    </div>
                    `;
                }
                if (account.edu_institute) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#toggles2"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Education Institute</h3>
                            <p>  </p>
                            <p>${account.edu_institute}</p>
                        </div>
                    </div>
                    `;
                }
                if (account.expect_grad_month && account.expect_grad_year) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#geo-fill"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Expected Graduate Date</h3>
                            <p>  </p>
                            <p>${account.expect_grad_year}/${account.expect_grad_month}</p>
                        </div>
                    </div>
                    `;
                }
                if (account.grad_status) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#gear-fill"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Graduate/Undergraduate</h3>
                            <p>  </p>
                            <p>${account.grad_status}</p>
                        </div>
                    </div>
                    `;
                }
                if (account.buildYear) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#tools"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">House Built Year</h3>
                            <p>  </p>
                            <p>${account.buildYear}</p>
                        </div>
                    </div>
                    `;
                }

                if (account.insu_acc_no) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#toggles2"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Home Insurance Account Number</h3>
                            <p>  </p>
                            <p>${account.insu_acc_no}</p>
                        </div>
                    </div>
                    `;
                }

                if (account.insu_name) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#geo-fill"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Insurance Company Name</h3>
                            <p>  </p>
                            <p>${account.insu_name}</p>
                        </div>
                    </div>
                    `;
                }
                if (account.insu_name) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#gear-fill"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Insurance Company Address</h3>
                            <p>  </p>
                            <p>${account.insu_address}</p>
                            ${account.insu_address2 ? `<p>${account.insu_address2}</p>` : ''}
                            <p>${account.insu_city}, ${account.insu_state}, ${account.insu_zip}</p>
                            <p>${account.insu_country}</p>
                        </div>
                    </div>
                    `;
                }

                if (account.year_insu_pre) {
                    features +=
                        `
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#chevron-right"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Yearly Insurance Premium</h3>
                            <p>  </p>
                            <p>${account.year_insu_pre}</p>
                        </div>
                    </div>
                    `;
                }

                features += '</div>';

                accountDetails.append(features);
            }

        });

    }).fail(function (xhr, status, error) {
        // handle error
        console.error("Request failed: " + status + ", " + error);

        if (error === "Unauthorized") {
            alert("You're not logged in. Please sign in !");
            window.location.href = "signin.html";
        }
    });
});

$(document).ready(function () {
    if(accountType === 'L'){
        return;
    }

    console.log('11111111');

    // init data
    let settings = {
        "url": "http://43.130.62.214:8080/account/gettransactions",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "userToken": localStorage.getItem('user_token'),
            "account_id": parseInt(accountId),
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#transactionTable').empty();
        if (response.Data.length === 0) {
            console.log('222222222');
            $('#Transaction').append('<h3 class="mb-3">Transaction Details</h3><p>No transaction found.</p>');
            // alert('No transaction found.');
        } else {
            console.log('333333333');
            var header = `
                <h3 class="mb-3">Transaction Details</h3>
                <div class="row mt-3">
                    <div class="col">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>From Account ID</th>
                                    <th>From Account Name</th>
                                    <th>To Account ID</th>
                                    <th>To Account Name</th>
                                    <th>Amount($)</th>
                                </tr>
                            </thead>
                            <tbody id="transactionTable">`;

            $('#Transaction').append(header);

            var transactions = response.Data;
            $.each(transactions, function (i, transaction) {
                if (transaction === null) {
                    return true;
                }

                var row = `<tr>
                        <td>${transaction.Transaction_id}</td>
                        <td>${transaction.from_account_id}</td>
                        <td>${transaction.from_account_name}</td>
                        <td>${transaction.to_account_id}</td>
                        <td>${transaction.to_account_name}</td>
                        <td>${transaction.amount}</td>
                    </tr>`;
                $('#transactionTable').append(row);
            });

            var row = `</tbody>
                    </table>
                </div>
            </div>`;

            $('#Transaction').append(row);
            
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // handle error
        console.error("Request failed: " + textStatus + ", " + errorThrown);

        if (errorThrown === "Unauthorized") {
            alert("You're not logged in. Please sign in !");
            window.location.href = "signin.html";
        }
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