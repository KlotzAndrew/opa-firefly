package httpapi.authz

import input as http_api

default allowPremium = false

allowPremium {
  userID = http_api.userID
  http_api.role = "premium"

  http_api.path =  ["rewards", userID, "redeem"]
  {http_api.method} == {http_api.method} & {"GET", "POST"}
}
