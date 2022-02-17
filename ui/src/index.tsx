import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
import {
  HashRouter as Router,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Modal from "react-modal";

import "jquery";
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonPageHeader, { pages } from "./components/CommonPageHeader";

import "./index.css";
import { SavedProgramsContextProvider } from "./components/lib/useSavedPrograms";

const App = () => {
  React.useEffect(() => Modal.setAppElement("body"), []);

  return (
    <div className="container pb-4 pr-4 pl-4">
      <Route
        component={({ history: { location } }: RouteComponentProps) => (
          <CommonPageHeader location={location.pathname} />
        )}
      />

      {pages.map(({ href, component }) => (
        <Route key={href} exact path={href} component={component} />
      ))}
    </div>
  );
};

ReactDOM.render(
  <Router>
    <SavedProgramsContextProvider>
      <App />
    </SavedProgramsContextProvider>
  </Router>,
  document.getElementById("root") as HTMLElement
);
reportWebVitals();
