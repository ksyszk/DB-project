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
        const accountList = $('#account_list');
        accountList.empty();  
        const accountData = response.Data.account_info;
        let isLoan = 1;
        let openNum = 0;

        console.log(accountData);

        $.each(accountData, function (key, account){
            if(key === "personal_loan_account" || key === "home_loan_account" || key === "student_loan_account"){
                if(account !== null){
                    isLoan = 0;
                }
            }

            if(key === "saving_account" || key === "checking_account"){
                if(account !== null){
                    openNum += 1;
                }
            }
        });

        if(openNum === 2 && isLoan === 0){
            let cardHtml = 
            `<p>You have opened all types of accounts!</p>`;

            accountList.append(cardHtml);
        } else{
            $.each(accountData, function (key, account) {
                if (account !== null) {
                    return true; 
                }
                let cardHtml = ``;
    
                if(key === 'saving_account'){
                    let cardHtml =
                    `
                    <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-${account.id}.jpg');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                            <h2 class="pt-1 mt-2 mb-4 fw-bold">Saving Account</h4>
                            <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <a href="./saving-form.html">Open</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    `;
                }
    
                if(key === 'checking_account'){
                    let cardHtml =
                    `
                    <div class="col">
                    <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-${account.id}.jpg');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                            <h2 class="pt-1 mt-2 mb-4 fw-bold">Checking Account</h4>
                            <ul class="d-flex list-unstyled mt-auto">
                                <li class="d-flex align-items-center me-3">
                                    <a href="./checking-form.html">Open</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                    `;
                }
    
                if(isLoan === 1){
                    if(key === 'personal_loan_account'){
                        let cardHtml =
                        `
                        <div class="col">
                        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-${account.id}.jpg');">
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                <h2 class="pt-1 mt-2 mb-4 fw-bold">Personal Loan Account</h4>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <li class="d-flex align-items-center me-3">
                                        <a href="./personal_loan.html">Open</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        `;
                    }
                    if(key === 'home_loan_account'){
                        let cardHtml =
                        `
                        <div class="col">
                        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-${account.id}.jpg');">
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                <h2 class="pt-1 mt-2 mb-4 fw-bold">Home Loan Account</h4>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <li class="d-flex align-items-center me-3">
                                        <a href="./home_loan.html">Open</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        `;
                    }
                    if(key === 'student_loan_account'){
                        let cardHtml =
                        `
                        <div class="col">
                        <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-${account.id}.jpg');">
                            <div class="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                <h2 class="pt-1 mt-2 mb-4 fw-bold">Student Loan Account</h4>
                                <ul class="d-flex list-unstyled mt-auto">
                                    <li class="d-flex align-items-center me-3">
                                        <a href="./student_loan.html">Open</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        `;
                    }
                }
    
                accountList.append(cardHtml);
            });
        }

        
    }).fail(function (xhr, status, error) {
        // handle error
        console.error("Request failed: " + status + ", " + error);

        if (error === "Unauthorized") {
            alert("You're not logged in. Please sign in !");
            window.location.href = "signin.html";
        }
    });
});

