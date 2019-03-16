import React from 'react'
import { Container, Row, Col } from 'react-materialize'
import { mdiMagnify, mdiArrowRight } from '@mdi/js'
import Banner from 'components/Banner'
import FeatureCard from 'components/FeatureCard'
import { Link } from 'react-router-dom'

const ChoosePage = ({ match: { path } }) => {
  const collection = path.split('/')[1]

  return (
    <>
      <Banner text={collection.replace('-', ' ')} />

      <Container>
        <h2 className="center">What would you like to do now?</h2>

        <Row>
          <Col s={12} l={6}>
            <Link to={`/${collection}/search`}>
              <FeatureCard icon={mdiMagnify} title={`Look up for ${collection}`} />
            </Link>
          </Col>
          <Col s={12} l={6}>
            <Link to={`/${collection}`}>
              <FeatureCard icon={mdiArrowRight} title={`View all ${collection}`} />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ChoosePage
