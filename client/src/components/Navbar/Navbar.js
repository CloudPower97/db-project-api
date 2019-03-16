import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'class-names'
import { Icon } from '@mdi/react'
import { mdiMenu } from '@mdi/js'

class Navbar extends Component {
  componentDidMount() {
    const { options } = this.props

    if (typeof M !== 'undefined') {
      this.instance = window.M.Sidenav.init(this._sidenav, options)
    }
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.destroy()
    }
  }

  render() {
    const { children, brand, className, extendWith, fixed, alignLinks, centerLogo } = this.props

    const brandClasses = cx({
      'brand-logo': true,
      center: centerLogo,
    })

    const navCSS = cx({ 'nav-extended': extendWith }, className)

    const navMobileCSS = cx('hide-on-med-and-down', [alignLinks])

    const links = Children.map(children, (link, index) => <li key={index}>{link}</li>)

    let navbar = (
      <nav className={navCSS}>
        <div className="nav-wrapper">
          {brand &&
            cloneElement(brand, {
              className: cx(brand.props.className, brandClasses),
            })}

          <a
            href="#!"
            data-target="mobile-nav"
            className="sidenav-trigger show-on-medium-and-down hide-on-med-and-up"
          >
            <Icon
              path={mdiMenu}
              size="2.5rem"
              color="white"
              style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}
            />
          </a>
          <ul className={navMobileCSS}>{links}</ul>
        </div>
        {extendWith && <div className="nav-content">{extendWith}</div>}
      </nav>
    )

    if (fixed) {
      navbar = <div className="navbar-fixed">{navbar}</div>
    }

    return (
      <>
        {navbar}

        <ul
          id="mobile-nav"
          className={cx('sidenav', [alignLinks])}
          ref={ul => {
            this._sidenav = ul
          }}
        >
          {links}
        </ul>
      </>
    )
  }
}

Navbar.propTypes = {
  brand: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  extendWith: PropTypes.node,
  /**
   * left makes the navbar links left aligned, right makes them right aligned
   */
  alignLinks: PropTypes.oneOf(['left', 'right']),
  /**
   * The logo will center itself on medium and down screens.
   * Specifying centerLogo as a prop the logo will always be centered
   */
  centerLogo: PropTypes.bool,
  /**
   * Makes the navbar fixed
   */
  fixed: PropTypes.bool,
  /**
   * Options hash for the sidenav.
   * More info: https://materializecss.com/sidenav.html#options
   */
  options: PropTypes.shape({
    // Side of screen on which Sidenav appears.
    edge: PropTypes.oneOf(['left', 'right']),
    // Allow swipe gestures to open / close Sidenav.
    draggable: PropTypes.bool,
    // Length in ms of enter transition.
    inDuration: PropTypes.number,
    // Length in ms of exit transition.
    outDuration: PropTypes.number,
    // Function called when sidenav starts entering.
    onOpenStart: PropTypes.func,
    // Function called when sidenav finishes entering.
    onOpenEnd: PropTypes.func,
    // Function called when sidenav starts exiting.
    onCloseStart: PropTypes.func,
    // Function called when sidenav finishes exiting.
    onCloseEnd: PropTypes.func,
    // Prevent page from scrolling while sidenav is open.
    preventScrolling: PropTypes.bool,
  }),
}

Navbar.defaultProps = {
  options: {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
  },
}

export default Navbar
