import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRouter from './components/auth/private_router'

import HomeScreen from "./screens/home";
import Register from "./screens/auth/register";
import Login from "./screens/auth/login";
import NotesIndex from "./screens/notes/index";
import UserEdit from "./screens/users/edit";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRouter exact path="/notes" component={NotesIndex} />
      <PrivateRouter exact path="/users/edit" component={UserEdit} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
