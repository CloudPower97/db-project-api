import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorPage from "containers/ErrorPage";
import SearchPage from "containers/SearchPage";
import ResultsPage from "containers/ResultsPage";
import ChoosePage from "containers/ChoosePage";
import AuthorPage from "./AuthorPage";

const Authors = ({ match: { path } }) => (
  <>
    <Switch>
      <Route exact path={path} component={ResultsPage} />
      <Route path={`${path}/search`} component={SearchPage} />
      <Route path={`${path}/choose`} component={ChoosePage} />
      <Route path={`${path}/error`} component={ErrorPage} />
      <Route exact path={`${path}/:ORCID`} component={AuthorPage} />
      <Redirect to={`${path}/choose`} />
    </Switch>
  </>
);

export default Authors;
