import React, { useContext } from "react";

import { Routes, Route } from "react-router-dom";

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import { AuthContext } from "./contexts/AuthContext";
import Navigation from "./components/navigation/Navigation";
import CreateCustomWorkoutPlanProvider from "./contexts/CreateCustomWorkoutContext";
import CustomProgramCreate from "./pages/CustomProgramCreate";
import Toast from "./components/common/notification/Toast";
import { UtilityContext, UtilityProvider } from "./contexts/UtilityContext";

type RouteType = {
  path: string;
  element: React.FC;
};

const routesForAuthUser: RouteType[] = [
  { path: "/logout", element: Logout },
  { path: "/program/create", element: CustomProgramCreate },
];

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
      <UtilityProvider>

      <Navigation>
        <Toast />
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
      </UtilityProvider>

    );
  }

  return render();
}

export default App;
