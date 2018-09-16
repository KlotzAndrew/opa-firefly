package httpapi.authz

test_get_anonymous_denied {
    not allow with input as {"path": ["accounts", "a"], "method": "GET", "user": "b"}
}

test_get_allowed {
    allow with input as {"path": ["accounts", "a"], "method": "GET", "user": "a"}
}

test_get_employee_allowed {
    allow with input as {"path": ["accounts", "b"], "method": "GET", "user": "a", "employees": ["b"]}
}

test_get_premium_allowed {
    allow with input as {
        "path": ["rewards", "a", "redeem"],
        "method": "GET",
        "user": "a",
        "role": "premium"
    }
}

test_get_premium_denied {
    not allow with input as {
        "path": ["rewards", "a", "redeem"],
        "method": "GET",
        "user": "a",
        "role": "not_premium"
    }
}

test_post_premium_allowed {
    allow with input as {
        "path": ["rewards", "a", "redeem"],
        "method": "POST",
        "user": "a",
        "role": "premium"
    }
}
