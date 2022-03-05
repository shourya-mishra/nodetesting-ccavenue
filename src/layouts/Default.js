
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import DefaultNavbar from "components/Navbars/DefaultNavbar.js";
import AuthNavbar from "components/Navbars/DefaultNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import routes from "routes.js";

class Default extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/default") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
      <div className="main-content" ref="mainContent">
          <DefaultNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
              
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/default/login" />
          </Switch>
          <Container fluid>
            <AuthFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Default;
