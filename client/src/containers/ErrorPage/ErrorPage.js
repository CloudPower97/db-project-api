import React from 'react'
import { Container, Row, Col } from 'react-materialize'
import {
  mdiAccountGroup,
  mdiCalendarMultiple,
  mdiFileDocumentBoxMultipleOutline,
  mdiDomain,
  mdiBookOpenPageVariant,
  mdiFeather,
  mdiHome,
} from '@mdi/js'
import Banner from 'components/Banner'
import FeatureCard from 'components/FeatureCard'
import { Link } from 'react-router-dom'
import Styles from './ErrorPage.module.css'
import cx from 'class-names'

const ChoosePage = ({ match: { path } }) => {
  const collection = path.split('/')[1]
  let icon = mdiAccountGroup

  switch (collection) {
    case 'conferences':
      icon = mdiCalendarMultiple
      break

    case 'documents':
      icon = mdiFileDocumentBoxMultipleOutline
      break

    case 'organizations':
      icon = mdiDomain
      break

    case 'periodicals':
      icon = mdiBookOpenPageVariant
      break

    case 'publishing-companies':
      icon = mdiFeather
      break

    default:
      icon = mdiAccountGroup
      break
  }

  return (
    <>
      <Banner text={`${collection.replace('-', ' ')} not found`} />

      <Container>
        <h2 className={cx('center', collection, Styles.ErrorPage)}>
          Whoops! That&apos;s an error!
        </h2>

        <Row>
          <Col s={12} l={6}>
            <Link to={`/${collection}/choose`}>
              <FeatureCard
                icon={icon}
                title={`Make another choice\nabout the ${collection} to find`}
                className={`${collection}`}
              />
            </Link>
          </Col>
          <Col s={12} l={6}>
            <Link to="/">
              <FeatureCard
                icon={mdiHome}
                title="Go back to the homepage"
                className={`${collection}`}
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ChoosePage
