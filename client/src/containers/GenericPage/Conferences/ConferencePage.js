import React from 'react'
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
import Helmet from 'react-helmet'
import DocumentsTable from 'components/DocumentsTable'
import OrganizationsTable from 'components/OrganizationsTable'
import SponsorsTable from 'components/SponsorsTable'
import withData from 'hoc/withData'
import conferenceImage from 'assets/img/conference.jpg'

const ConferencePage = ({ data }) => {
  let text = 'Fetching conference info...'
  let content = <Spinner />

  if (data) {
    const { conference, organizations, sponsors, documents } = data

    text = (
      <>
        <span>{`${conference.edition}`}</span>
        <br />
        <span
          className="flow-text"
          style={{
            fontStyle: 'italic',
            marginLeft: 85,
          }}>
          {`${conference.location}`}
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
                    header={<CardTitle image={conferenceImage} />}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus
                    nunc, eu laoreet urna. Sed urna elit, placerat eget quam id, dignissim elementum
                    metus. Aenean sed ullamcorper quam, in condimentum magna. Donec elementum
                    laoreet erat et gravida. Pellentesque augue orci, volutpat eget lectus ac,
                    pretium gravida quam.
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
      <Helmet>
        <title>{data ? `Conferences - ${data.conference.name}` : 'Conferences'}</title>
      </Helmet>
      <Banner text={text} />
      {content}
    </>
  )
}

export default withData(ConferencePage, ['documents', 'sponsors', 'organizations'])
