package httpapi.authz

import input as http_api

default allowManagers = false

allowManagers {
  http_api.method = "GET"
  http_api.path = ["accounts", userID]
  http_api.employees[_] = userID
}
