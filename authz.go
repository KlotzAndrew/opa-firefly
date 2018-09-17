package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/labstack/echo"
)

type user struct {
	UserID    string   `json:"userID"`
	Employees []string `json:"employees"`
	Role      string   `json:"role"`
}

type opaResponse struct {
	Result map[string]bool `json:"result"`
}

func authz(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if isAuthorized(c) {
			return next(c)
		}
		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid credentials")
	}
}

func isAuthorized(c echo.Context) bool {
	u := unmarshalUser(c.Request().Header.Get("JWT"))

	values := map[string]map[string]interface{}{
		"input": {
			"userID":    u.UserID,
			"method":    c.Request().Method,
			"path":      trimPath(c.Request().URL.Path),
			"employees": u.Employees,
			"role":      u.Role,
		},
	}

	response := checkAuthz(values)

	for _, v := range response.Result {
		if v == true {
			return true
		}
	}
	return false
}

func unmarshalUser(jwt string) user {
	var u user
	if err := json.Unmarshal([]byte(jwt), &u); err != nil {
		panic(err)
	}
	return u
}

func checkAuthz(values map[string]map[string]interface{}) opaResponse {
	jsonValue, _ := json.Marshal(values)

	opaURL := "http://0.0.0.0:8181/v1/data/httpapi/authz"
	resp, errp := http.Post(opaURL, "application/json", bytes.NewBuffer(jsonValue))
	if errp != nil {
		panic(errp)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}

	var response opaResponse
	if errj := json.Unmarshal(body, &response); errj != nil {
		panic(errj)
	}

	return response
}

func trimPath(url string) []string {
	tmppath := strings.TrimSpace(url)
	path := strings.Split(tmppath, "/")
	if path[0] == "/" || path[0] == "" {
		path = path[1:]
	}
	return path
}
