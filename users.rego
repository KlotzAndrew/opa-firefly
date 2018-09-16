package httpapi.authz

# HTTP API request
import input as http_api

default allow = false

# Allow users to get their own salaries.
allow {
  http_api.method = "GET"
  http_api.path = ["users", userID]
  userID = http_api.user
}
