// TODO: Remove this component if this PR is accepted: https://github.com/react-materialize/react-materialize/pull/795
import React, { Component } from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'

class Parallax extends Component {
  componentDidMount() {
    if (typeof M !== 'undefined') {
      const { options } = this.props
      this.instance = window.M.Parallax.init(this._parallax, options)
    }
  }

  componentWillUnmount() {
    this.instance && this.instance.destroy()
  }

  render() {
    const { className, children, imageSrc, image, ...props } = this.props

    delete props.options

    return (
      <div className={cx('parallax-container', className)} {...props}>
        {children}
        <div className="parallax" ref={div => (this._parallax = div)}>
          {image || <img alt="" src={imageSrc} />}
        </div>
      </div>
    )
  }
}

Parallax.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The image path which will be used for the background of the parallax
   */
  imageSrc: PropTypes.string,
  options: PropTypes.shape({
    /**
     * The minimum width of the screen, in pixels, where the parallax functionality starts working.
     */
    responsiveThreshold: PropTypes.number,
  }),
}

Parallax.defaultProps = {
  options: {
    responsiveThreshold: 0,
  },
}

export default Parallax
