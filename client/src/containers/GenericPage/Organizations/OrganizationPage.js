import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tabs, Tab, Container, Row, Col, Card, Section, CardTitle } from 'react-materialize'
import Styles from './OrganizationPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import { mdiCheckboxBlankCircle, mdiAccountGroup, mdiCalendarMultiple, mdiMapMarker } from '@mdi/js'
import AuthorsTable from 'components/AuthorsTable'
import ConferencesTable from 'components/ConferencesTable'
import withData from 'hoc/withData'
import Helmet from 'react-helmet'
import organizationImage from 'assets/img/organization.jpg'

const OrganizationPage = ({ data }) => {
  let text = 'Fetching organization info...'
  let content = <Spinner className="organizations" />

  if (data) {
    const { organization, authors, conferences } = data

    text = organization.name
    content = (
      <Tabs className="tabs-fixed-width z-depth-1">
        <Tab title="Document" active>
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
                    header={<CardTitle image={organizationImage} />}>
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
                          <Icon path={mdiCheckboxBlankCircle} color="var(--blue)" size={1.8} />
                          <Icon path={mdiMapMarker} color="white" size={1.1} />
                        </Stack>
                        Location
                      </span>
                    }
                    className={cx('rounded hoverable', Styles.InfoCard)}>
                    <span className="flow-text">{organization.location}</span>
                  </Card>

                  <Card
                    title={
                      <span className="card-title grey-text text-darken-4">
                        <Stack size={1.8}>
                          <Icon path={mdiCheckboxBlankCircle} color="var(--blue)" size={1.8} />
                          <Icon path={mdiCalendarMultiple} color="white" size={1} />
                        </Stack>
                        Conferences
                      </span>
                    }
                    className={cx('rounded', Styles.InfoCard)}>
                    <span className="flow-text">{conferences.length}</span>
                  </Card>

                  <Card
                    title={
                      <span className="card-title grey-text text-darken-4">
                        <Stack size={1.8}>
                          <Icon path={mdiCheckboxBlankCircle} color="var(--blue)" size={1.8} />
                          <Icon path={mdiAccountGroup} color="white" size={1.2} />
                        </Stack>
                        Authors
                      </span>
                    }
                    className={cx('rounded', Styles.InfoCard)}>
                    <span className="flow-text">{authors.length}</span>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Section>
        </Tab>
        <Tab title="Authors">
          <AuthorsTable data={authors} className={Styles.Table} />
        </Tab>
        <Tab title="Conferences">
          <ConferencesTable data={conferences} className={Styles.Table} />
        </Tab>
      </Tabs>
    )
  }

  return (
    <>
      <Helmet>
        <title>{data ? `Organizations - ${data.organization.name}` : 'Organizations'}</title>
      </Helmet>
      <Banner text={text} />
      {content}
    </>
  )
}

OrganizationPage.propTypes = {
  data: PropTypes.object,
}

export default withData(OrganizationPage, ['authors', 'conferences'])
