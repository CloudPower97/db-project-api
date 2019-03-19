import React from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'
import CardContent from './CardContent/CardContent'
import CardTitle from './CardTitle/CardTitle'
import CardAction from './CardAction/CardAction'
import CardImage from './CardImage/CardImage'
import CardTabs from './CardTabs/CardTabs'

const Card = ({
  children,
  className,
  title,
  image,
  fab,
  horizontal,
  actions,
  reveal,
  tabs,
  stickyActions,
  small,
  medium,
  large,
  style,
}) => {
  const cardCSS = cx(
    'card',
    {
      horizontal,
      'sticky-action': stickyActions,
      small,
      medium,
      large,
    },
    className
  )

  let card = (
    <>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {children}
      </CardContent>
      {actions ? <CardAction>{actions}</CardAction> : null}
    </>
  )

  if (image) {
    const isFabLarge = fab && (fab.props.large || fab.props.children.props.large)

    card = (
      <>
        <CardImage image={image} fab={fab}>
          {!isFabLarge ? <CardTitle className={title.className}>{title}</CardTitle> : null}
        </CardImage>
        <CardContent>
          {isFabLarge ? <CardTitle>{title}</CardTitle> : null} {children}
        </CardContent>
        {actions ? <CardAction>{actions}</CardAction> : null}
      </>
    )
  }

  if (tabs) {
    card = (
      <>
        <CardContent>
          <CardTitle>{title}</CardTitle>
        </CardContent>
        <CardTabs>{tabs}</CardTabs>
      </>
    )
  }

  if (horizontal) {
    card = (
      <>
        <CardImage image={image} fab={fab} />
        <div className="card-stacked">
          <CardContent>{children}</CardContent>
          {actions ? <CardAction>{actions}</CardAction> : null}
        </div>
      </>
    )
  }

  if (reveal) {
    card = (
      <>
        <CardImage image={image} reveal />
        <CardContent>
          <CardTitle reveal>{title}</CardTitle>
        </CardContent>
        {actions ? <CardAction>{actions}</CardAction> : null}
        <div className="card-reveal">
          <CardTitle closeReveal>{title}</CardTitle>
          {children}
        </div>
      </>
    )
  }

  return (
    <div className={cardCSS} style={style}>
      {card}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  textClassName: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  horizontal: PropTypes.bool,
  actions: PropTypes.node,
  style: PropTypes.object,
  stickyActions: PropTypes.bool,
  fab: PropTypes.object,
  reveal: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  tabs: PropTypes.node,
}

export default Card
