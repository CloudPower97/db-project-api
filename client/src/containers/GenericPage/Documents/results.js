import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from 'components/Spinner'
import ReactTable from 'react-table'
import ResultsPage from 'containers/ResultsPage'

export class Results extends Component {
  state = {
    data: null,
  }

  componentDidMount() {
    const { match } = this.props

    axios
      .get(`${match.path}`)
      .then(({ data }) => {
        this.setState({
          data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { data } = this.state

    let Content = () => {
      if (data) {
        const columns = [
          {
            Header: 'Document title',
            accessor: 'title',
            Cell: props => {
              return <Link to={`/documents/${props.original.id}`}>{props.value}</Link>
            },
          },
          {
            Header: 'Pages',
            accessor: 'number_of_pages',
          },
          {
            id: 'publisher',
            Header: 'Publisher',
            accessor: d => d.Number.Periodical.PublishingCompany.name,
            Cell: props => {
              return (
                <Link
                  to={`/publishing-companies/${
                    props.original.Number.Periodical.PublishingCompany.id
                  }`}
                >
                  {props.value}
                </Link>
              )
            },
          },
        ]
        return <ReactTable className="-striped" data={data} columns={columns} showPaginationTop />
      } else {
        return <Spinner />
      }
    }

    return (
      <ResultsPage results={data && data.length}>
        <Content />
      </ResultsPage>
    )
  }
}

export default Results
