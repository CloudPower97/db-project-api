import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const SponsorsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
  ]

  if (data) {
    return (
      <ReactTable
        className={cx('-striped', className)}
        data={data}
        columns={columns}
        showPaginationTop
      />
    )
  } else {
    return <Spinner />
  }
}

SponsorsTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default SponsorsTable
