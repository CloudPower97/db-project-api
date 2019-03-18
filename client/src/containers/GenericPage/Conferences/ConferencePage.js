import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tab, Container, Row, Col, Card, Section, CardTitle } from 'react-materialize'
import Tabs from 'components/Tabs'
import Styles from './ConferencePage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import {
  mdiFormatQuoteClose,
  mdiFileDocumentBoxMultipleOutline,
  mdiCheckboxBlankCircle,
  mdiAlphaH,
} from '@mdi/js'
import DocumentsTable from 'components/DocumentsTable'
import { Redirect } from 'react-router-dom'

export class AuthorPage extends Component {
  state = {
    data: null,
    error: false,
  }

  componentDidMount() {
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

  render() {
    const { data, error } = this.state

    let text = 'Fetching conference info...'
    let content = <Spinner />

    if (error) {
      return <Redirect to="/conferences/error" />
    }

    if (!error && data) {
      text = (
        <>
          <span>{`${data.edition}`}</span>
          <br />
          <span
            className="flow-text"
            style={{
              fontStyle: 'italic',
              marginLeft: 85,
            }}
          >
            {`${data.location}`}
          </span>
        </>
      )

      content = (
        <Tabs className="tabs-fixed-width z-depth-1">
          <Tab title="Conference" active>
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
                            <Icon path={mdiCheckboxBlankCircle} color="var(--green)" size={1.8} />
                            <Icon path={mdiAlphaH} color="white" size={1.2} />
                          </Stack>
                          Documents
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}
                    >
                      <span className="flow-text">0</span>
                    </Card>
                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--green)" size={1.8} />
                            <Icon path={mdiFileDocumentBoxMultipleOutline} color="white" size={1} />
                          </Stack>
                          Sponsors
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}
                    >
                      <span className="flow-text">{data.documents_count}</span>
                    </Card>
                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--green)" size={1.8} />
                            <Icon path={mdiFormatQuoteClose} color="white" size={1.2} />
                          </Stack>
                          Organizations
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}
                    >
                      <span className="flow-text">{data.documents_count + 3 * 5}</span>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Section>
          </Tab>
          <Tab title="Editions" active>
            Conference Editions
          </Tab>
          <Tab title="Documents" active>
            <DocumentsTable data={data.Documents} className={Styles.Table} />
          </Tab>
          <Tab title="Sponsors" active>
            Sponsors
          </Tab>
          <Tab title="Organizations" active>
            Organizations
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
