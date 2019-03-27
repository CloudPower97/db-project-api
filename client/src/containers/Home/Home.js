import React from 'react'
import { Section, Container, Row, Col } from 'react-materialize'
import Parallax from 'components/Parallax'
import { Link } from 'react-router-dom'
import FeatureCard from 'components/FeatureCard'
import {
  mdiDomain,
  mdiAccountGroup,
  mdiFileDocumentBoxMultipleOutline,
  mdiBookOpenPageVariant,
  mdiCalendarMultiple,
  mdiFeather,
} from '@mdi/js'
import homeImage from 'assets/img/home.jpg'

const Home = () => (
  <>
    <Parallax
      imageSrc={homeImage}
      style={{
        height: 280,
      }}
    />

    <Section>
      <Container>
        <h1 className="center grey-text text-darken-2">
          An online subscription-based scientific citation indexing service
        </h1>

        <Row>
          <Col s={12} l={6} xl={4}>
            <Link to="/authors/choose">
              <FeatureCard
                icon={mdiAccountGroup}
                title="Authors"
                content="Look up for authors by first name, last name, organization or ORCID"
                className="authors"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/documents/choose">
              <FeatureCard
                icon={mdiFileDocumentBoxMultipleOutline}
                title="Documents"
                content="Look up for authors by first name, last name, organization or ORCID"
                className="documents"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/periodicals/choose">
              <FeatureCard
                icon={mdiBookOpenPageVariant}
                title="Periodicals"
                content="Look up for authors by first name, last name, organization or ORCID"
                className="periodicals"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/organizations/choose">
              <FeatureCard
                icon={mdiDomain}
                title="Organizations"
                content="Look up for authors by first name, last name, organization or ORCID"
                className="organizations"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/conferences/choose">
              <FeatureCard
                icon={mdiCalendarMultiple}
                title="Conferences"
                content="Look up for authors by first name, last name, organization or ORCID"
                className="conferences"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/publishing-companies/choose">
              <FeatureCard
                icon={mdiFeather}
                title="Publishing Companies"
                content="Look up for authors by first name, last name, organization or ORCID"
                className="publishing-companies"
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </Section>
  </>
)

export default Home
