import React from 'react'
import Navbar from 'components/Navbar'
import { Button, Footer } from 'react-materialize'
import Icon from '@mdi/react'
import { mdiArrowUp, mdiGithubCircle, mdiReact, mdiNodejs } from '@mdi/js'
import ScrollToTop from 'react-scroll-up'
import { NavHashLink as Link } from 'react-router-hash-link'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'

const Layout = ({ children, t }) => (
  <>
    <header>
      <Navbar
        brand={<Link to="/">Database Systems Project</Link>}
        className="z-depth-3"
        fixed
        alignLinks="right"
      >
        <Link className="sidenav-close" to="/authors/search">
          {t('authorSearch')}
        </Link>
        <Link className="sidenav-close" to="/documents/search">
          {t('documentSearch')}
        </Link>
        <Link className="sidenav-close" to="/periodicals/search">
          {t('periodicalSearch')}
        </Link>
        <Link className="sidenav-close" to="/organizations/search">
          {t('organizationSearch')}
        </Link>
        <Link className="sidenav-close" to="/conferences/search">
          {t('conferencesSearch')}
        </Link>
        <Link className="sidenav-close" to="/publishing-companies/search">
          {t('publishingCompaniesSearch')}
        </Link>
      </Navbar>
    </header>
    <main>{children}</main>
    <ScrollToTop showUnder={800} style={{ zIndex: '2' }}>
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
          <Icon color="white" path={mdiGithubCircle} size={1.5} />
          Source code on Github
        </a>
      }
      links={
        <ul>
          <li>
            <a className="grey-text text-lighten-3" href="#!">
              <Icon color="white" path={mdiReact} size={1.5} />
              React.js
            </a>
          </li>
          <li>
            <a className="grey-text text-lighten-3" href="#!">
              <Icon color="white" path={mdiNodejs} size={1.5} />
              Express.js
            </a>
          </li>
          <li>
            <a className="grey-text text-lighten-3" href="#!">
              Heroku
            </a>
          </li>
          <li>
            <a className="grey-text text-lighten-3" href="#!">
              PostgreSQL
            </a>
          </li>
        </ul>
      }
    >
      <h5 className="white-text">Database Systems Project</h5>
      <p className="grey-text text-lighten-4">
        This project has been made possible by the fantastic technologies listed here on the right
      </p>
    </Footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
}

export default withNamespaces(['navbar', 'footer'])(Layout)
