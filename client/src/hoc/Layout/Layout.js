import React from "react";
import Navbar from "components/Navbar";
import { Button, Footer, Chip } from "react-materialize";
import Icon from "@mdi/react";
import { mdiArrowUp, mdiGithubCircle, mdiReact, mdiNodejs } from "@mdi/js";
import ScrollToTop from "react-scroll-up";
import { NavHashLink as Link } from "react-router-hash-link";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";
import Headroom from "react-headroom";
import PostgreLogo from "assets/PostgreSQL.svg";
import HerokuLogo from "assets/Heroku.svg";
import Dropdown from "components/Dropdown";

const Layout = ({ children, t }) => (
  <>
    <header>
      <Headroom>
        <Navbar
          brand={<Link to="/">DB Systems Project</Link>}
          className="z-depth-3"
          alignLinks="right"
        >
          {/* <Dropdown
            trigger={
              <Button flat className="white-text">
                Authors
              </Button>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false
            }}
          >
            <Link className="sidenav-close" to="/authors/search">
              Search author
            </Link>
            <Link className="sidenav-close" to="/authors">
              All authors
            </Link>
          </Dropdown> */}
          <Link className="sidenav-close" to="/authors/search">
            {t("authorSearch")}
          </Link>
          <Link className="sidenav-close" to="/documents/search">
            {t("documentSearch")}
          </Link>
          <Link className="sidenav-close" to="/periodicals/search">
            {t("periodicalSearch")}
          </Link>
          <Link className="sidenav-close" to="/organizations/search">
            {t("organizationSearch")}
          </Link>
          <Link className="sidenav-close" to="/conferences/search">
            {t("conferencesSearch")}
          </Link>
          <Link className="sidenav-close" to="/publishing-companies/search">
            {t("publishingCompaniesSearch")}
          </Link>
        </Navbar>
      </Headroom>
    </header>
    <main>{children}</main>
    <ScrollToTop showUnder={800}>
      <Button
        floating
        large
        className="green-gradient hoverable"
        waves="light"
        style={{
          bottom: 64,
          right: 20,
          position: "fixed",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon path={mdiArrowUp} size={1.125} color="white" />
      </Button>
    </ScrollToTop>
    <Footer
      copyrights={`Copyright Ⓒ ${new Date().getFullYear()} - Claudio Cortese`}
      moreLinks={
        <a
          className="grey-text text-lighten-4 right"
          href="https://github.com/CloudPower97/db-project-api"
        >
          <Icon color="white" path={mdiGithubCircle} size={1.2} /> Source code
          on Github
        </a>
      }
      links={
        <ul id="footer-links">
          <li>
            <Chip className="blue lighten-1 hoverable">
              <a
                className="grey-text text-lighten-3"
                href="https://reactjs.org/"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <Icon color="white" path={mdiReact} size={1.4} />
                React.js
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="green hoverable">
              <a
                className="grey-text text-lighten-3"
                href="https://expressjs.com/"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <Icon color="white" path={mdiNodejs} size={1.4} />
                Express.js
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="purple hoverable">
              <a
                className="grey-text text-lighten-3"
                href="https://www.heroku.com/home"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <img src={HerokuLogo} width={31.5} />
                Heroku
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="blue darken-3 hoverable">
              <a
                className="grey-text text-lighten-3"
                href="https://www.postgresql.org/"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <img src={PostgreLogo} width={30} />
                PostgreSQL
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="grey lighten-4 hoverable">
              <a
                className="black-text"
                href="https://github.com/"
                rel="external noopener noreferrer"
                target="_blank"
              >
                <Icon color="black" path={mdiGithubCircle} size={1.4} />
                Github
              </a>
            </Chip>
          </li>
        </ul>
      }
    >
      <h5 className="white-text">Database Systems Project</h5>
      <p className="grey-text text-lighten-4">
        This project has been made possible by the fantastic technologies listed
        here
      </p>
    </Footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node,
  t: PropTypes.func.isRequired
};

export default withNamespaces(["navbar", "footer"])(Layout);
