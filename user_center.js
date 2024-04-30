$(document).ready(function () {
    var settings = {
        "url": "http://43.130.62.214:8080/account/usercenter",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "userToken": localStorage.getItem('user_token')
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        if (response.Status !== 0) {
            alert(response.ErrorMsg);
        }

        const info = response.Data.user_info;
        console.log(info);
        const userlist = $('#user_info');
        userlist.empty();

        let profiles = `
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#people-circle"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">User Name</h3>
                            <p>  </p>
                            <p>${info.FName} ${info.LName}</p>
                        </div>
                    </div>

                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#table"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Email Address</h3>
                            <p>  </p>
                            <p>${info.Email}</p>
                        </div>
                    </div>

                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#collection"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">User ID</h3>
                            <p>  </p>
                            <p>${info.ID}</p>
                        </div>
                    </div>

                    <div class="col d-flex align-items-start">
                        <svg class="bi text-body-secondary flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"/></svg>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">Billing Address</h3>
                            <p>  </p>
                            <p>${info.Street}</p>
                            ${info.Apart ? `<p>${info.Apart}</p>` : ''}
                            <p>${info.City}, ${info.State}, ${info.Zip}</p>
                        </div>
                    </div>
                </div>
                `;

            userlist.append(profiles);
        
    

        const accounts = Object.values(response.Data.account_info);
        const accountList = $('#account_list');
        accountList.empty();  

        accounts.forEach(account => {
            if (account === null) {
                return true; 
            }

            const cardHtml = `
                        <div class="col">
                            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-${account.id}.jpg');">
                                <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <h2 class="pt-1 mt-2 mb-4 fw-bold">${account.account_type === 'C' ? 'Checking' : account.account_type === 'S' ? 'Saving' : 'Loan'} Account</h4>
                                    <p>Account ID: ${account.id}</p>
                                    <p>Balance/Loan Amount: $${account.amount.toFixed(2)}</p>
                                    <ul class="d-flex list-unstyled mt-auto">
                                        <li class="d-flex align-items-center me-3">
                                            <a href="./account_detail.html?account_id=${account.id}">Details</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
            accountList.append(cardHtml);
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        // handle error
        console.error("Request failed: " + textStatus + ", " + errorThrown);

        if (errorThrown === "Unauthorized") {
            alert("You're not logged in. Please sign in !");
            window.location.href = "signin.html";
        }
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