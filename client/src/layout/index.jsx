import React from "react"
import routes from "../routes"
import { Route, Routes } from "react-router-dom"
import { Card } from "@mui/material"

export default function Layout() {
  return (
    <div className="w-screen h-screen flex shrink-0 items-center justify-center">
      <Card
        variant="outlined"
        className="w-1/2 h-3/4 shadow-lg bg-white flex justify-between"
        id="layout-container"
      >
        <div className="flex-1">
          <Routes>
            {routes.map((item) => {
              return (
                <Route
                  index
                  key={item.path}
                  exact
                  path={item.path}
                  element={item.component()}
                ></Route>
              )
            })}
          </Routes>
        </div>
      </Card>
    </div>
  )
}
