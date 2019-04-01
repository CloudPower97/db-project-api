import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'
import { mdiMagnify } from '@mdi/js'
import Icon from '@mdi/react'
import Styles from './SearchButton.module.css'
import cx from 'class-names'

const SearchButton = ({ search, match: { path } }) => {
  const collection = path.split('/')[1]

  return (
    <Link
      to={{
        pathname: `/${collection}`,
        search,
      }}>
      <Button large className={cx(Styles.SearchButton, collection)}>
        <Icon size={1.25} path={mdiMagnify} color="white" /> Search
      </Button>
    </Link>
  )
}

SearchButton.propTypes = {
  search: PropTypes.string,
  match: PropTypes.object,
}

export default withRouter(SearchButton)
