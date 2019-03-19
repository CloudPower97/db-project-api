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
  mdiCheckboxBlankCircle,
  mdiDomain,
  mdiFileDocumentBoxMultipleOutline,
  mdiBullhornOutline,
} from '@mdi/js'
import DocumentsTable from 'components/DocumentsTable'
import OrganizationsTable from 'components/OrganizationsTable'
import SponsorsTable from 'components/SponsorsTable'
import { Redirect } from 'react-router-dom'

class ConferencesPage extends Component {
  state = {
    data: null,
    documents: [],
    sponsors: [],
    organizations: [],
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

    axios
      .get(`${match.url}/documents`)
      .then(({ data: documents }) => {
        this.setState({
          documents,
          error: typeof documents === 'string',
        })
      })
      .catch(() => {
        this.setState({
          error: true,
        })
      })

    axios
      .get(`${match.url}/sponsors`)
      .then(({ data: sponsors }) => {
        this.setState({
          sponsors,
          error: typeof sponsors === 'string',
        })
      })
      .catch(() => {
        this.setState({
          error: true,
        })
      })

    axios
      .get(`${match.url}/organizations`)
      .then(({ data: organizations }) => {
        this.setState({
          organizations,
          error: typeof organizations === 'string',
        })
      })
      .catch(() => {
        this.setState({
          error: true,
        })
      })
  }

  render() {
    const { data, error, organizations, sponsors, documents } = this.state

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
            }}>
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
                  }}>
                  <Col s={12} xl={9}>
                    <Card
                      className="rounded large flow-text"
                      header={
                        <CardTitle image="https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                      }>
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
                            <Icon path={mdiFileDocumentBoxMultipleOutline} color="white" size={1} />
                          </Stack>
                          Documents
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}>
                      <span className="flow-text">{documents.length}</span>
                    </Card>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--green)" size={1.8} />
                            <Icon path={mdiBullhornOutline} color="white" size={1.1} />
                          </Stack>
                          Sponsors
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}>
                      <span className="flow-text">{sponsors.length}</span>
                    </Card>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--green)" size={1.8} />
                            <Icon path={mdiDomain} color="white" size={1.2} />
                          </Stack>
                          Organizations
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}>
                      <span className="flow-text">{organizations.length}</span>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Section>
          </Tab>
          <Tab title="Documents">
            <DocumentsTable data={documents} className={Styles.Table} />
          </Tab>
          <Tab title="Sponsors">
            <SponsorsTable data={sponsors} className={Styles.Table} />
          </Tab>
          <Tab title="Organizations">
            <OrganizationsTable data={organizations} className={Styles.Table} />
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

export default ConferencesPage
