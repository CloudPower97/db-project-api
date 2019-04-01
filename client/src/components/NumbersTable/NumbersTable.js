import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const NumbersTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Volume',
      accessor: 'volume',
    },
    {
      Header: 'Number',
      accessor: 'number',
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

NumbersTable.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
}

export default NumbersTable
