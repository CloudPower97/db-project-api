import React from 'react'
import { Section, Container, Row, Col, Divider, Button } from 'react-materialize'
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
  mdiArrowRight,
} from '@mdi/js'
import Icon from '@mdi/react'
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
        <div
          className="center"
          style={{
            paddingBottom: '3rem',
          }}>
          <h1 className="center grey-text text-darken-2">
            An online scientific citation indexing service
          </h1>

          <Link to="/learn-more">
            <Button className="hoverable move-icon-forward blueGradient" large>
              Discover more
              <Icon path={mdiArrowRight} size="1.3rem" />
            </Button>
          </Link>
        </div>

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
                content="Look up for documents by title, number of pages or DOI"
                className="documents"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/periodicals/choose">
              <FeatureCard
                icon={mdiBookOpenPageVariant}
                title="Periodicals"
                content="Look up for periodicals by title or ISSN"
                className="periodicals"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/organizations/choose">
              <FeatureCard
                icon={mdiDomain}
                title="Organizations"
                content="Look up for organizations by name and location"
                className="organizations"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/conferences/choose">
              <FeatureCard
                icon={mdiCalendarMultiple}
                title="Conferences"
                content="Look up for conferences by name and location"
                className="conferences"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/publishing-companies/choose">
              <FeatureCard
                icon={mdiFeather}
                title="Publishing Companies"
                content="Look up for publishing companies by name"
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
