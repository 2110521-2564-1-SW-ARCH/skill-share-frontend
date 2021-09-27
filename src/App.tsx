import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";

import Profile from "./Pages/profile/index";
import "./App.css";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import Navbar from "./Components/Navbar/Navbar";
import BottomNav from "./Components/BottomNav/BottomNav";

function App() {
  return (
    <div className="App">
      <Navbar name="Default" />
      <UserDataProvider>
        <div className="layout">
          <Switch>
            <Route exact path="/:username">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </UserDataProvider>
      <BottomNav />
    </div>
  );
}

export default App;
