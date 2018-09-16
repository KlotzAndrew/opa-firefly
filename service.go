package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo"
)

type user struct {
	UserID string `json:"userId"`
}

type opaResult struct {
	Allow bool `json:"allow"`
}

type opaResponse struct {
	Result opaResult `json:"result"`
}

func getUser(c echo.Context) error {
	// id := c.Param("id")

	allow := authz(c)

	return c.String(http.StatusOK, strconv.FormatBool(allow))
}

func authz(c echo.Context) bool {
	jwt := c.Request().Header.Get("JWT")
	fmt.Println(jwt)

	var u user
	if err := json.Unmarshal([]byte(jwt), &u); err != nil {
		panic(err)
	}
	fmt.Println(u)

	userID := u.UserID
	method := c.Request().Method
	url := c.Request().URL.Path

	path := strings.Split(url, "/")
	fmt.Println(path)
	if path[0] == "/" || path[0] == "" {
		path = path[1:]
	}
	values := map[string]map[string]interface{}{
		"input": {
			"user":   userID,
			"method": method,
			"path":   path,
		},
	}
	fmt.Println(values)

	jsonValue, _ := json.Marshal(values)

	opaURL := "http://localhost:8181/v1/data/httpapi/authz"
	resp, errp := http.Post(opaURL, "application/json", bytes.NewBuffer(jsonValue))
	if errp != nil {
		panic(errp)
	}
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err.Error())
	}

	var opaResp opaResponse
	if errj := json.Unmarshal(body, &opaResp); errj != nil {
		panic(errj)
	}

	return opaResp.Result.Allow
}

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/users/:id", getUser)
	e.Logger.Fatal(e.Start(":1323"))
}
