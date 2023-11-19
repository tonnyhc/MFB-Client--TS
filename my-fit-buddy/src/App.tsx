import React, { ReactNode, useContext } from "react";

import { Routes, Route } from "react-router-dom";

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import { AuthContext } from "./contexts/AuthContext";
import Navigation from "./components/navigation/Navigation";
import CreateCustomWorkoutPlanProvider from "./contexts/CreateCustomWorkoutContext";

type RouteType = {
  path: string;
  element: React.FC;
};

const routesForAuthUser: RouteType[] = [{ path: "/logout", element: Logout }];

const routesForUnAuthUser: RouteType[] = [
  { path: "/register", element: Register },
  { path: "/login", element: Login },
];

function App() {
  const { isAuth } = useContext(AuthContext);

  function render() {
    if (!isAuth) {
      return (
        <Routes>
          {routesForUnAuthUser.map((route, index) => (
            <Route path={route.path} element={<route.element />} key={index} />
          ))}
        </Routes>
      );
    }

    return (
      <Navigation>
        <div className="h-[calc(100%-98px-50px)] mt-[54px] relative overflow-hidden ">
          <CreateCustomWorkoutPlanProvider>
          <Routes>
            {routesForAuthUser.map((route, index) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={index}
              />
            ))}
          </Routes>
          </CreateCustomWorkoutPlanProvider>
        </div>
      </Navigation>
    );
  }

  return render();
}

export default App;
