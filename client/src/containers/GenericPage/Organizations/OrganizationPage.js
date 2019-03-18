import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tab, Container, Row, Col, Card, Section, CardTitle } from 'react-materialize'
import Tabs from 'components/Tabs'
import Styles from './OrganizationPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import {
  mdiFormatQuoteClose,
  mdiFileDocumentBoxMultipleOutline,
  mdiCheckboxBlankCircle,
  mdiFeather,
} from '@mdi/js'
import AuthorsTable from 'components/AuthorsTable'
import { Redirect, Link } from 'react-router-dom'

export class AuthorPage extends Component {
  state = {
    data: null,
    authors: null,
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

    axios
      .get('1/authors')
      .then(({ data: authors }) => {
        this.setState({
          authors,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchDocument()
    }
  }

  render() {
    const { data, error, authors } = this.state

    let text = 'Fetching organization info...'
    let content = <Spinner />

    if (error) {
      return <Redirect to="/organizations/error" />
    }

    if (!error && data) {
      text = `${data.name}, ${data.location}`

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
                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--blue)" size={1.8} />
                            <Icon path={mdiFeather} color="white" size={1.2} />
                          </Stack>
                          Periodical
                        </span>
                      }
                      className={cx('rounded hoverable', Styles.InfoCard)}
                    >
                      <span className="flow-text">x</span>
                    </Card>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--blue)" size={1.8} />
                            <Icon path={mdiFileDocumentBoxMultipleOutline} color="white" size={1} />
                          </Stack>
                          Conferences
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}
                    >
                      <span className="flow-text">{data.Conferences.length}</span>
                    </Card>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--blue)" size={1.8} />
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
          <Tab title="Authors">
            {(authors && <AuthorsTable data={authors} className={Styles.Table} />) || <Spinner />}
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
