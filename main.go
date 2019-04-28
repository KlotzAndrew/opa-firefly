package main

import (
	"net/http"

	"github.com/labstack/echo"
)

func getAccount(c echo.Context) error {
	return echo.NewHTTPError(http.StatusOK, "All good!")
}

func main() {
	e := echo.New()

	e.GET("/accounts/:id", getAccount)
	e.GET("/rewards/:id/redeem", getAccount)

	e.Use(authz)

	e.Logger.Fatal(e.Start(":1323"))
}
