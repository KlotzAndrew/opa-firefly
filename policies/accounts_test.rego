package httpapi.authz

test_get_anonymous_denied {
    not allowAccounts with input as {
        "path": ["accounts", "a"],
        "method": "GET",
        "userID": "b"
    }
}

test_get_allowed {
    allowAccounts with input as {
        "path": ["accounts", "a"],
        "method": "GET",
        "userID": "a"
    }
}
