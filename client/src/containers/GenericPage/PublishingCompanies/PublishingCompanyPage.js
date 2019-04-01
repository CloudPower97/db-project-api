import React from 'react'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tabs, Tab, Container, Row, Col, Card, Section } from 'react-materialize'
import Styles from './PublishingCompanyPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import { mdiBookOpenPageVariant, mdiCheckboxBlankCircle } from '@mdi/js'
import PeriodicalsTable from 'components/PeriodicalsTable'
import withData from 'hoc/withData'
import Helmet from 'react-helmet'

const PublishingCompanyPage = ({ data }) => {
  let text = 'Fetching publishing company info...'
  let content = <Spinner className="publishing-companies" />

  if (data) {
    const { publishingCompany, periodicals } = data

    text = `${publishingCompany.name}`
    content = (
      <Tabs className="tabs-fixed-width z-depth-1">
        <Tab title="Publishing Company" active>
          <Section>
            <Container>
              <Row
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}>
                <Col s={12} xl={9}>
                  <Card className="rounded large flow-text">
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
                          <Icon path={mdiCheckboxBlankCircle} color="var(--plum)" size={1.8} />
                          <Icon path={mdiBookOpenPageVariant} color="white" size={0.9} />
                        </Stack>
                        Periodicals
                      </span>
                    }
                    className={cx('rounded hoverable', Styles.InfoCard)}>
                    <span className="flow-text">{periodicals.length}</span>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Section>
        </Tab>
        <Tab title="Periodicals">
          <PeriodicalsTable data={periodicals} className={Styles.Table} />
        </Tab>
      </Tabs>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {data ? `Publishing Companies - ${data.publishingCompany.name}` : 'Publishing Companies'}
        </title>
      </Helmet>
      <Banner text={text} />
      {content}
    </>
  )
}

export default withData(PublishingCompanyPage, ['periodicals'])
