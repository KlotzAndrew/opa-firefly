package httpapi.authz

test_get_premium_allowed {
    allowPremium with input as {
        "path": ["rewards", "a", "redeem"],
        "method": "GET",
        "userID": "a",
        "role": "premium"
    }
}

test_get_premium_denied {
    not allowPremium with input as {
        "path": ["rewards", "a", "redeem"],
        "method": "GET",
        "userID": "a",
        "role": "not_premium"
    }
}

test_post_premium_allowed {
    allowPremium with input as {
        "path": ["rewards", "a", "redeem"],
        "method": "POST",
        "userID": "a",
        "role": "premium"
    }
}
