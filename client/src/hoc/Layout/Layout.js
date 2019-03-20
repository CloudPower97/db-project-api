import React from 'react'
import Navbar from 'components/Navbar'
import { Button, Footer, Chip } from 'react-materialize'
import Icon from '@mdi/react'
import { mdiArrowUp, mdiGithubCircle, mdiReact, mdiNodejs } from '@mdi/js'
import ScrollToTop from 'react-scroll-up'
import { NavHashLink as Link } from 'react-router-hash-link'
import PropTypes from 'prop-types'
import Headroom from 'react-headroom'
import PostgreLogo from 'assets/PostgreSQL.svg'
import HerokuLogo from 'assets/Heroku.svg'
import Dropdown from 'components/Dropdown'

const Layout = ({ children }) => (
  <>
    <header>
      <Headroom>
        <Navbar
          brand={<Link to="/">DB Systems Project</Link>}
          className="z-depth-3"
          alignLinks="right"
          /* eslint-disable */
          mobileLinks={[
            <Link to="/authors/choose" className="sidenav-close">
              Authors
            </Link>,
            <Link to="/documents/choose" className="sidenav-close">
              Documents
            </Link>,
            <Link to="/periodicals/choose" className="sidenav-close">
              Periodicals
            </Link>,
            <Link to="/organizations/choose" className="sidenav-close">
              Organizations
            </Link>,
            <Link to="/conferences/choose" className="sidenav-close">
              Conferences
            </Link>,
            <Link to="/publishing-companies/choose" className="sidenav-close">
              Publishing Companies
            </Link>,
          ]}
          /* eslint-enable */
        >
          <Dropdown
            trigger={
              <span>
                <Link to="/authors">Authors</Link>
              </span>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false,
              coverTrigger: false,
            }}
            className="authors-dropdown">
            <Link to="/authors/search">Search author</Link>
            <Link to="/authors">All authors</Link>
          </Dropdown>
          <Dropdown
            trigger={
              <span>
                <Link to="/documents">Documents</Link>
              </span>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false,
              coverTrigger: false,
            }}
            className="documents-dropdown">
            <Link className="sidenav-close" to="/documents/search">
              Search documents
            </Link>
            <Link className="sidenav-close" to="/documents">
              All documents
            </Link>
          </Dropdown>
          <Dropdown
            trigger={
              <span>
                <Link to="/periodicals">Periodicals</Link>
              </span>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false,
              coverTrigger: false,
            }}
            className="periodicals-dropdown">
            <Link className="sidenav-close" to="/periodicals/search">
              Search periodicals
            </Link>
            <Link className="sidenav-close" to="/periodicals">
              All periodicals
            </Link>
          </Dropdown>
          <Dropdown
            trigger={
              <span>
                <Link to="/organizations">Organizations</Link>
              </span>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false,
              coverTrigger: false,
            }}
            className="organizations-dropdown">
            <Link className="sidenav-close" to="/organizations/search">
              Search organization
            </Link>
            <Link className="sidenav-close" to="/organizations">
              All organizations
            </Link>
          </Dropdown>
          <Dropdown
            trigger={
              <span>
                <Link to="/conferences">Conferences</Link>
              </span>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false,
              coverTrigger: false,
            }}
            className="conferences-dropdown">
            <Link className="sidenav-close" to="/conferences/search">
              Search conference
            </Link>
            <Link className="sidenav-close" to="/conferences">
              All conferences
            </Link>
          </Dropdown>
          <Dropdown
            trigger={
              <span>
                <Link to="/publishing-companies">Publishing Companies</Link>
              </span>
            }
            options={{
              alignment: 'right',
              hover: true,
              constrainWidth: false,
              coverTrigger: false,
            }}
            className="publishing-companies-dropdown">
            <Link className="sidenav-close" to="/publishing-companies/search">
              Search publishing company
            </Link>
            <Link className="sidenav-close" to="/publishing-companies">
              All publishing companies
            </Link>
          </Dropdown>
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
          position: 'fixed',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon path={mdiArrowUp} size={1.125} color="white" />
      </Button>
    </ScrollToTop>
    <Footer
      copyrights={`Copyright Ⓒ ${new Date().getFullYear()} - Claudio Cortese`}
      moreLinks={
        <a
          className="grey-text text-lighten-4 right"
          href="https://github.com/CloudPower97/db-project-api">
          <Icon color="white" path={mdiGithubCircle} size={1.2} /> Source code on Github
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
                target="_blank">
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
                target="_blank">
                <Icon color="white" path={mdiNodejs} size={1.4} />
                Express.js
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="blue darken-3 hoverable">
              <a
                className="grey-text text-lighten-3"
                href="https://www.postgresql.org/"
                rel="external noopener noreferrer"
                target="_blank">
                <img src={PostgreLogo} alt="PostgreSQL" width={28} />
                PostgreSQL
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="purple hoverable">
              <a
                className="grey-text text-lighten-3"
                href="https://www.heroku.com/home"
                rel="external noopener noreferrer"
                target="_blank">
                <img src={HerokuLogo} alt="Heroku" width={25} />
                Heroku
              </a>
            </Chip>
          </li>
          <li>
            <Chip className="grey lighten-4 hoverable">
              <a
                className="black-text"
                href="https://github.com/"
                rel="external noopener noreferrer"
                target="_blank">
                <Icon color="black" path={mdiGithubCircle} size={1.4} />
                Github
              </a>
            </Chip>
          </li>
        </ul>
      }>
      <h5 className="white-text">Database Systems Project</h5>
      <p className="grey-text text-lighten-4">
        This project has been made possible by the fantastic technologies listed here
      </p>
    </Footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
