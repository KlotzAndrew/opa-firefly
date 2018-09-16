```bash
curl -X PUT --data-binary @users.rego \
  localhost:8181/v1/policies/example
```

```bash
curl -H "JWT: {\"userId\": \"a\"}" http://0.0.0.0:1323/users/123
```
