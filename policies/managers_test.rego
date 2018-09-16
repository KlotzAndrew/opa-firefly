package httpapi.authz

test_get_employee_allowed {
    allowManagers with input as {
        "path": ["accounts", "b"],
        "method": "GET",
        "userID": "a",
        "employees": ["b"]
    }
}
