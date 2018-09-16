package httpapi.authz

# HTTP API request
import input as http_api

default allow = false

allow {
  http_api.method = "GET"
  http_api.path = ["accounts", userID]
  userID = http_api.user
}

allow {
  http_api.method = "GET"
  http_api.path = ["accounts", userID]
  http_api.employees[_] = userID
}

allow {
  userID = http_api.user
  http_api.role = "premium"

  http_api.path =  ["rewards", userID, "redeem"]
  {http_api.method} == {http_api.method} & {"GET", "POST"}
}
