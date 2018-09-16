package httpapi.authz

import input as http_api

default allowAccounts = false

allowAccounts {
  http_api.method = "GET"
  http_api.path = ["accounts", userID]
  userID = http_api.userID
}
