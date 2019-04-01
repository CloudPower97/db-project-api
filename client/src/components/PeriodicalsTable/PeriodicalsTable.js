import React from 'react'
import { Link } from 'react-router-dom'
import ReactTable from 'react-table'
import Spinner from 'components/Spinner'
import cx from 'class-names'

const AuthorsTable = ({ data, className }) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'title',
      Cell: props => <Link to={`/periodicals/${props.original.id}`}>{props.value}</Link>,
    },
    {
      id: 'publishing-company',
      Header: 'Publishing Company',
      accessor: d => d.PublishingCompany.name,
      // eslint-disable-next-line react/display-name
      Cell: props => (
        <Link to={`/publishing-companies/${props.original.PublishingCompany.id}`}>
          {props.value}
        </Link>
      ),
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
    return <Spinner className="periodicals" />
  }
}

export default AuthorsTable
