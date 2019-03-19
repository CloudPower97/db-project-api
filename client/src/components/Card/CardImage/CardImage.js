import React from 'react'
import cx from 'class-names'
import PropTypes from 'prop-types'
import Picture from '@cloudpower97/react-progressive-picture'

const CardImage = ({ children, className, image, fab, reveal, style }) => (
  <>
    <div
      className={cx(
        'card-image',
        {
          'waves-effect': reveal,
          'waves-block': reveal,
          'waves-light': reveal,
        },
        className
      )}
      style={style}
    >
      <Picture className={reveal && 'activator'} src={image} alt="" />
      {children}
    </div>
    {fab && (
      <div className="card-fab" style={{ position: 'relative', zIndex: '1' }}>
        {fab}
      </div>
    )}
  </>
)

CardImage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  image: PropTypes.string,
  fab: PropTypes.object,
  reveal: PropTypes.bool,
}

export default CardImage
