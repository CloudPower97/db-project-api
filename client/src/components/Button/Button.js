import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Icon } from 'react-materialize'

const STYLES = ['large', 'small', 'floating', 'flat']
const WAVES = ['light', 'red', 'yellow', 'orange', 'purple', 'green', 'teal']

class Button extends Component {
  constructor(props) {
    super(props)
    this.renderIcon = this.renderIcon.bind(this)
    this.renderFab = this.renderFab.bind(this)
  }

  componentDidMount() {
    if (!window.M) return

    const { tooltip, tooltipOptions = {}, fab } = this.props
    if (tooltip) {
      this.instance = window.M.Tooltip.init(this._btnEl || this._floatingActionBtn, tooltipOptions)
    }

    if (fab) {
      this.instance = window.M.FloatingActionButton.init(this._floatingActionBtn, {})
    }
  }

  componentWillUnmount() {
    if (this.instance) {
      this.instance.destroy()
    }
  }

  render() {
    const {
      className,
      node,
      fab,
      fabClickOnly,
      modal,
      flat,
      floating,
      large,
      small,
      disabled,
      waves,
      tooltip,
      style,
      ...other
    } = this.props

    delete other.tooltipOptions

    const toggle = fabClickOnly ? 'click-to-toggle' : ''
    let C = node
    let classes = {
      btn: true,
      disabled,
      'waves-effect': waves,
    }

    if (WAVES.indexOf(waves) > -1) {
      classes['waves-' + waves] = true
    }

    let styles = { flat, floating, large, small }
    STYLES.forEach(style => {
      if (styles[style]) {
        classes.btn = false
        classes['btn-' + style] = true
      }
    })

    if (modal) {
      classes['modal-' + modal] = true
    }
    if (fab) {
      return this.renderFab(cx(classes, className), fab, toggle)
    } else {
      return (
        <C
          {...other}
          disabled={!!disabled}
          style={style}
          onClick={this.props.onClick}
          className={cx(classes, className)}
          ref={el => (this._btnEl = el)}
          data-tooltip={tooltip}>
          {this.renderIcon()}
          {this.props.children}
        </C>
      )
    }
  }

  renderFab(className, mode, clickOnly) {
    const classes = cx(mode, clickOnly)
    return (
      <div
        ref={el => (this._floatingActionBtn = el)}
        className={cx('fixed-action-btn', classes)}
        style={this.props.style}
        data-tooltip={this.props.tooltip}
        onClick={this.props.onClick}>
        <button className={className}>{this.renderIcon()}</button>
        <ul>
          {React.Children.map(this.props.children, (child, index) => (
            <li key={index}>{child}</li>
          ))}
        </ul>
      </div>
    )
  }

  renderIcon() {
    const { icon } = this.props
    if (!icon) return

    if (typeof icon === 'object') {
      return icon
    }

    return <Icon>{icon}</Icon>
  }
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Enable other styles
   */
  flat: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  floating: PropTypes.bool,
  /**
   * Fixed action button
   * If enabled, any children button will be rendered as actions, remember to provide an icon.
   * @default vertical. This will disable any onClick function from being called on the main button.
   */
  fab: PropTypes.oneOf([true, 'vertical', 'horizontal', 'toolbar']),
  /**
   * The icon to display, if specified it will create a button with the material icon.
   */
  icon: PropTypes.node,
  modal: PropTypes.oneOf(['close', 'confirm']),
  node: PropTypes.node,
  /**
   * Will be disabled when fab is set.
   */
  onClick: PropTypes.func,
  /**
   * Tooltip to show when mouse hovered
   */
  tooltip: PropTypes.string,
  /**
   * Tooltips options as here
   * http://archives.materializecss.com/0.100.2/dialogs.html#tooltip
   */
  tooltipOptions: PropTypes.shape({
    enterDelay: PropTypes.number,
    exitDelay: PropTypes.number,
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltip: PropTypes.string,
    html: PropTypes.bool,
  }),
  waves: PropTypes.oneOf([true, 'light', 'red', 'yellow', 'orange', 'purple', 'green', 'teal']),
  /**
   * FAB Click-Only
   * Turns a FAB from a hover-toggle to a click-toggle
   */
  fabClickOnly: PropTypes.bool,
}

Button.defaultProps = {
  node: 'button',
}

export default Button
