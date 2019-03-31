import React from 'react'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tabs, Tab, Container, Row, Col, Card, Section, Chip } from 'react-materialize'
import Styles from './DocumentPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import {
  mdiCheckboxBlankCircle,
  mdiAccountGroup,
  mdiBookOpenPageVariant,
  mdiCalendarMultiple,
} from '@mdi/js'
import Helmet from 'react-helmet'
import DocumentsTable from 'components/DocumentsTable'
import AuthorsTable from 'components/AuthorsTable'
import { Link } from 'react-router-dom'
import withData from 'hoc/withData'

const DocumentPage = ({ data }) => {
  let text = 'Fetching document info...'
  let content = <Spinner />

  if (data) {
    const { document, authors, citingDocuments, citedDocuments } = data

    text = (
      <>
        <span>{`${document.title}`}</span>{' '}
        {document.Authors.map(author => (
          <Link key={author.ORCID} to={`/authors/${author.ORCID}`}>
            <Chip className="hoverable">{`${author.name}, ${author.initials.surname}`}</Chip>
          </Link>
        ))}
      </>
    )
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
                <Col
                  s={12}
                  xl={9}
                  style={{
                    display: 'flex',
                  }}>
                  <Card
                    className="rounded large flow-text"
                    title="Document abstract"
                    actions={[
                      <a href={`https://doi.org/${document.DOI}`} rel="external">
                        <Chip className="hoverable">DOI: {document.DOI}</Chip>
                      </a>,
                    ]}
                    style={{
                      height: 'auto',
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus
                    nunc, eu laoreet urna. Sed urna elit, placerat eget quam id, dignissim elementum
                    metus. Aenean sed ullamcorper quam, in condimentum magna. Donec elementum
                    laoreet erat et gravida. Pellentesque augue orci, volutpat eget lectus ac,
                    pretium gravida quam.
                  </Card>
                </Col>
                <Col s={12} xl={3} className={cx(Styles.InfoCardsCol)}>
                  <Link to={`/periodicals/${document.Number.Periodical.id}`}>
                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--purple)" size={1.8} />
                            <Icon path={mdiBookOpenPageVariant} color="white" size={1} />
                          </Stack>
                          Periodical
                        </span>
                      }
                      className={cx('rounded hoverable', Styles.InfoCard, Styles.PeriodicalCard)}>
                      <span className="flow-text">
                        {document.Number.Periodical.title} - Vol. {document.Number.volume}, Iss.
                        {document.Number.number}
                      </span>
                    </Card>
                  </Link>

                  <Link to={`/conferences/${document.Conference.id}`}>
                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--purple)" size={1.8} />
                            <Icon path={mdiCalendarMultiple} color="white" size={1} />
                          </Stack>
                          Conference
                        </span>
                      }
                      className={cx('rounded hoverable', Styles.InfoCard, Styles.ConferenceCard)}>
                      <span className="flow-text">{document.Conference.edition}</span>
                    </Card>
                  </Link>

                  <Card
                    title={
                      <span className="card-title grey-text text-darken-4">
                        <Stack size={1.8}>
                          <Icon path={mdiCheckboxBlankCircle} color="var(--purple)" size={1.8} />
                          <Icon path={mdiAccountGroup} color="white" size={1.2} />
                        </Stack>
                        Authors
                      </span>
                    }
                    className={cx('rounded', Styles.InfoCard)}>
                    <span className="flow-text">{document.Authors.length}</span>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Section>
        </Tab>
        <Tab title="Authors">
          <AuthorsTable data={authors} className={Styles.Table} />
        </Tab>
        <Tab title="Citing Documents">
          <DocumentsTable data={citingDocuments} className={Styles.Table} />
        </Tab>
        <Tab title="Cited Documents">
          <DocumentsTable data={citedDocuments} className={Styles.Table} />
        </Tab>
      </Tabs>
    )
  }

  return (
    <>
      <Helmet>
        <title>{data ? `Documents - ${data.document.title}` : 'Documents'}</title>
      </Helmet>
      <Banner text={text} />
      {content}
    </>
  )
}

export default withData(DocumentPage, ['authors', 'citing-documents', 'cited-documents'])
