package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo"
)

func getAccount(c echo.Context) error {
	allow := authz(c)

	return c.String(http.StatusOK, strconv.FormatBool(allow))
}

func main() {
	e := echo.New()

	e.GET("/accounts/:id", getAccount)
	e.GET("/rewards/:id/redeem", getAccount)
	e.Logger.Fatal(e.Start(":1323"))
}
