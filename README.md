```bash
# setup support services
docker-compose up

# setup working service
go run service.go authz.go

# setup frontend
cd opa-admin && npm start
```

Checking permissions
```bash
curl -H "JWT: {\"userId\": \"a\"}" http://0.0.0.0:1323/accounts/a

curl -H "JWT: {\"userId\": \"a\", \"employees\": [\"c\"]}" http://0.0.0.0:1323/accounts/b

curl -H "JWT: {\"userId\": \"a\", \"role\": \"premium\"}" http://0.0.0.0:1323/rewards/a/redeem
```


Adding/removing policies
```bash
curl -X PUT --data-binary @accounts.rego \
  localhost:8181/v1/policies/accounts

curl -X PUT --data-binary @managers.rego \
    localhost:8181/v1/policies/managers

curl -X PUT --data-binary @premium.rego \
    localhost:8181/v1/policies/premium

curl -X DELETE localhost:8181/v1/policies/premium
curl -X DELETE localhost:8181/v1/policies/managers
```

Inspecting policies
```bash
# list policies
curl localhost:8181/v1/policies

curl localhost:8181/v1/policies | jq '.result | .[].id'

# get policy
curl localhost:8181/v1/policies/<id>

# create/update policy
PUT /v1/policies/example1
```
