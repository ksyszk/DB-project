$(document).ready(function () {
    // init data
    let settings = {
        "url": "http://43.130.62.214:8080/users/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({}),
    };

    $.ajax(settings).done(function (response) {
        // TODO Assume this data come form server
        let response_data = {
            "user_info": {

            },
            "account_info": {
                "saving_account": {
                    "id": 1,
                    "street": "street_xxx",
                    "city": "city_xxx",
                    "state": "state_xxx",
                    "zip": 11201,
                    "account_type": "S",
                    "user_id": 1,
                    "ctime": "2024-01-01 00:00:00",
                    "utime": "2024-01-01 00:00:00",
                    "amount": 3672.23,
                    "interest_rate": 1.2,
                },
                "checking_account": {
                    "id": 2,
                    "street": "street_xxx",
                    "city": "city_xxx",
                    "state": "state_xxx",
                    "zip": 11201,
                    "account_type": "C",
                    "user_id": 1,
                    "ctime": "2024-01-01 00:00:00",
                    "utime": "2024-01-01 00:00:00",
                    "amount": 3672.23,
                    "service_charge": 3.2,
                },
                "student_loan_account": {
                    "id": 3,
                    "street": "street_xxx",
                    "city": "city_xxx",
                    "state": "state_xxx",
                    "zip": 11201,
                    "account_type": "C",
                    "user_id": 1,
                    "ctime": "2024-01-01 00:00:00",
                    "utime": "2024-01-01 00:00:00",
                    "rate": 31.2,
                    "amount": 23847.00,
                    "month": 36,
                    "payment": 232,
                    "type": "S",
                    "loan_id": 1,
                    "edu_institute": "NYU",
                    "student_id": "JM123",
                    "grad_status": "undergraduated",
                    "expect_grad_month": "08",
                    "expect_grad_year": "2025",
                },
                "home_loan_account": {
                    "id": 4,
                    "street": "street_xxx",
                    "city": "city_xxx",
                    "state": "state_xxx",
                    "zip": 11201,
                    "account_type": "C",
                    "user_id": 1,
                    "ctime": "2024-01-01 00:00:00",
                    "utime": "2024-01-01 00:00:00",
                    "rate": 31.2,
                    "amount": 23847.00,
                    "month": 36,
                    "payment": 232,
                    "type": "H",
                    "build_year": "2023",
                    "insur_acc_num": "insurance_account_number",
                    "insur_name": "WSJ INS",
                    "insur_street": "wall street",
                    "insur_city": "NYC",
                    "insur_state": "NY",
                    "insur_zip": "11201",
                    "year_insur_prm": 2034.00,
                },
                "personal_loan_account": {
                    "id": 5,
                    "street": "street_xxx",
                    "city": "city_xxx",
                    "state": "state_xxx",
                    "zip": 11201,
                    "account_type": "C",
                    "user_id": 1,
                    "ctime": "2024-01-01 00:00:00",
                    "utime": "2024-01-01 00:00:00",
                    "rate": 31.2,
                    "amount": 23847.00,
                    "month": 36,
                    "payment": 232,
                    "type": "P",
                },
            },
        }
        console.log(response);
    }).fail(function (xhr, status, error) {
        // error handling
        console.log(222222222);
    });
});

