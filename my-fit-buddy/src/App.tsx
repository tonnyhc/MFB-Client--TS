import React from "react";

import {Routes, Route} from 'react-router-dom'

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

type RouteType = {
  path: string;
  element: React.FC;
};

const routes: RouteType[] = [
  { path: "/register", element: Register },
  { path: "/login", element: Login },
];

function App() {


  return (
    <Routes>
      {routes.map((route, index) =>  <Route path={route.path} element={<route.element />} key={index} />)}
    </Routes>
  )
}

export default App;
