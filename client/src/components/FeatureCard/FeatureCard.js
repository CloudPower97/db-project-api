import React from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'
import { CardPanel } from 'react-materialize'
import Icon from '@mdi/react'
import Style from './FeatureCard.module.css'

const FeatureCard = ({ children, className, icon, title, content, hoverable, rounded }) => (
  <CardPanel className={cx(className, Style.FeatureCard, { hoverable, rounded })}>
    <div className={Style.FeatureIcon}>
      <Icon path={icon} size={2.7} />
    </div>
    <h5>{title}</h5>
    <p className="flow-text grey-text">{content}</p>
    {children}
  </CardPanel>
)

FeatureCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  hoverable: PropTypes.bool,
  rounded: PropTypes.bool,
}

FeatureCard.defaultProps = {
  hoverable: true,
  rounded: true,
}

export default FeatureCard
