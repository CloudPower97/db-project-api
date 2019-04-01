import React from 'react'
import { Section, Container, Row, Col, Button } from 'react-materialize'
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
import Picture from '@cloudpower97/react-progressive-picture'
import { homeJpg, homeWebP, homeSvg } from 'assets/img'
import cx from 'class-names'
import Styles from './Home.module.css'

const Home = () => (
  <>
    <Parallax
      image={
        <Picture
          sources={[
            {
              srcSet: homeWebP,
              type: 'image/webp',
            },
            {
              srcSet: homeJpg,
              type: 'image/jpg',
            },
          ]}
          placeholder={homeSvg}
        />
      }
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
            <Button className="hoverable move-icon-forward green-gradient" large>
              Discover more
              <Icon path={mdiArrowRight} size="1.3rem" />
            </Button>
          </Link>
        </div>

        <Row>
          <Col s={12} l={6} xl={4}>
            <Link to="/authors/choose">
              <FeatureCard
                className={cx(Styles.FeatureCard, 'authors')}
                icon={mdiAccountGroup}
                title="Authors"
                content="Look up for authors by first name, last name, organization or ORCID"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/documents/choose">
              <FeatureCard
                className={cx(Styles.FeatureCard, 'documents')}
                icon={mdiFileDocumentBoxMultipleOutline}
                title="Documents"
                content="Look up for documents by title, number of pages or DOI"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/periodicals/choose">
              <FeatureCard
                className={cx(Styles.FeatureCard, 'periodicals')}
                icon={mdiBookOpenPageVariant}
                title="Periodicals"
                content="Look up for periodicals by title or ISSN"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/organizations/choose">
              <FeatureCard
                className={cx(Styles.FeatureCard, 'organizations')}
                icon={mdiDomain}
                title="Organizations"
                content="Look up for organizations by name and location"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/conferences/choose">
              <FeatureCard
                className={cx(Styles.FeatureCard, 'conferences')}
                icon={mdiCalendarMultiple}
                title="Conferences"
                content="Look up for conferences by name and location"
              />
            </Link>
          </Col>
          <Col s={12} l={6} xl={4}>
            <Link to="/publishing-companies/choose">
              <FeatureCard
                className={cx(Styles.FeatureCard, 'publishing-companies')}
                icon={mdiFeather}
                title="Publishing Companies"
                content="Look up for publishing companies by name"
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </Section>
  </>
)

export default Home
