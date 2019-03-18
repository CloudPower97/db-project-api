import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tab, Container, Row, Col, Card, Section, CardTitle, Chip } from 'react-materialize'
import Tabs from 'components/Tabs'
import Styles from './DocumentPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import {
  mdiFormatQuoteClose,
  mdiFileDocumentBoxMultipleOutline,
  mdiCheckboxBlankCircle,
  mdiFeather,
} from '@mdi/js'
import DocumentsTable from 'components/DocumentsTable'
import { Redirect, Link } from 'react-router-dom'

export class AuthorPage extends Component {
  state = {
    data: null,
    error: false,
  }

  fetchDocument() {
    const { match } = this.props

    axios
      .get(`${match.url}`)
      .then(({ data }) => {
        this.setState({
          data,
          error: typeof data === 'string',
        })
      })
      .catch(() => {
        this.setState({
          error: true,
        })
      })
  }

  componentDidMount() {
    this.fetchDocument()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchDocument()
    }
  }

  render() {
    const { data, error } = this.state

    let text = 'Fetching document info...'
    let content = <Spinner />

    if (error) {
      return <Redirect to="/documents/error" />
    }

    if (!error && data) {
      text = (
        <>
          <span>{`${data.title}`}</span>
          <br />
          {data.Authors.map(author => (
            <Link key={author.ORCID} to={`/authors/${author.ORCID}`}>
              <Chip className="hoverable">{`${author.name}, ${author.initials.surname}`}</Chip>
            </Link>
          ))}
        </>
      )

      content = (
        <Tabs className="tabs-fixed-width z-depth-1">
          <Tab title="Document" active>
            <Section>
              <Container>
                <Row
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  <Col s={12} xl={9}>
                    <Card
                      className="rounded large flow-text"
                      header={
                        <CardTitle image="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                          Card Title
                        </CardTitle>
                      }
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus
                      nunc, eu laoreet urna. Sed urna elit, placerat eget quam id, dignissim
                      elementum metus. Aenean sed ullamcorper quam, in condimentum magna. Donec
                      elementum laoreet erat et gravida. Pellentesque augue orci, volutpat eget
                      lectus ac, pretium gravida quam.
                    </Card>
                  </Col>
                  <Col s={12} xl={3} className={cx(Styles.InfoCardsCol)}>
                    <Link to={`/periodicals/${data.Number.Periodical.id}`}>
                      <Card
                        title={
                          <span className="card-title grey-text text-darken-4">
                            <Stack size={1.8}>
                              <Icon
                                path={mdiCheckboxBlankCircle}
                                color="var(--purple)"
                                size={1.8}
                              />
                              <Icon path={mdiFeather} color="white" size={1.2} />
                            </Stack>
                            Periodical
                          </span>
                        }
                        className={cx('rounded hoverable', Styles.InfoCard)}
                      >
                        <span className="flow-text">
                          {data.Number.Periodical.title} - Vol. {data.Number.volume}, Iss.
                          {data.Number.number}
                        </span>
                      </Card>
                    </Link>

                    <Link to={`/conferences/${data.Conference.id}`}>
                      <Card
                        title={
                          <span className="card-title grey-text text-darken-4">
                            <Stack size={1.8}>
                              <Icon
                                path={mdiCheckboxBlankCircle}
                                color="var(--purple)"
                                size={1.8}
                              />
                              <Icon
                                path={mdiFileDocumentBoxMultipleOutline}
                                color="white"
                                size={1}
                              />
                            </Stack>
                            Conference
                          </span>
                        }
                        className={cx('rounded', Styles.InfoCard)}
                      >
                        <span className="flow-text">{data.Conference.edition}</span>
                      </Card>
                    </Link>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--purple)" size={1.8} />
                            <Icon path={mdiFormatQuoteClose} color="white" size={1.2} />
                          </Stack>
                          Authors
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}
                    >
                      <span className="flow-text">{data.Authors.length}</span>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Section>
          </Tab>
          <Tab title="Citing Documents">
            <DocumentsTable data={data.citingDocuments} className={Styles.Table} />
          </Tab>
          <Tab title="Cited Documents">
            <DocumentsTable data={data.citedDocuments} className={Styles.Table} />
          </Tab>
        </Tabs>
      )
    }

    return (
      <>
        <Banner text={text} />
        {content}
      </>
    )
  }
}

export default AuthorPage
