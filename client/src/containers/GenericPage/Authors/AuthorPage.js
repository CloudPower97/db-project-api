import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tab, Container, Row, Col, Card, Section, Chip } from 'react-materialize'
import Tabs from 'components/Tabs'
import Picture from '@cloudpower97/react-progressive-picture'
import Styles from './AuthorPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import {
  mdiFileDocumentBoxMultipleOutline,
  mdiCheckboxBlankCircle,
  mdiAlphaH,
  mdiDomain,
} from '@mdi/js'
import DocumentsTable from 'components/DocumentsTable'
import { Redirect, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

class AuthorPage extends Component {
  state = {
    data: null,
    error: false,
  }

  componentDidMount() {
    const { match } = this.props

    axios
      .get(`/api${match.url}`)
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
  }

  render() {
    const { data, error } = this.state

    let text = 'Fetching author info...'
    let content = <Spinner />

    if (error) {
      return <Redirect to="/authors/error" />
    } else {
      if (data) {
        text = `${data.name} ${data.surname}`

        content = (
          <Tabs className="tabs-fixed-width z-depth-1">
            <Tab title="Author" active>
              <Section>
                <Container>
                  <Row
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}>
                    <Col s={12} xl={9}>
                      <Card
                        className="rounded large"
                        actions={[
                          <a href={`https://www.orcid.org/${data.ORCID}`}>
                            <Chip className="hoverable">ORCID: {data.ORCID}</Chip>
                          </a>,
                        ]}>
                        <Picture
                          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                          alt="User avatar placholder"
                          blur={0}
                          width={128}
                          className={cx('circle left', Styles.AuthorPicture)}
                        />
                        <p className="flow-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed
                          faucibus nunc, eu laoreet urna. Sed urna elit, placerat eget quam id,
                          dignissim elementum metus. Aenean sed ullamcorper quam, in condimentum
                          magna. Donec elementum laoreet erat et gravida. Pellentesque augue orci,
                          volutpat eget lectus ac, pretium gravida quam. Nunc ac dignissim augue.
                          Suspendisse risus diam, porttitor at ligula at, pretium aliquet nunc.
                          Suspendisse potenti. In elementum mauris luctus euismod feugiat. Donec ac
                          lectus venenatis, rhoncus massa et, scelerisque leo. Pellentesque enim
                          ipsum, malesuada non venenatis non, ornare in purus. Ut convallis orci et
                          ex auctor, a tincidunt velit accumsan.
                        </p>
                      </Card>
                    </Col>
                    <Col s={12} xl={3} className={cx(Styles.InfoCardsCol)}>
                      <Link to={`/organizations/${data.Organization.id}`}>
                        <Card
                          title={
                            <span className="card-title grey-text text-darken-4">
                              <Stack size={1.8}>
                                <Icon
                                  path={mdiCheckboxBlankCircle}
                                  color="var(--orange)"
                                  size={1.8}
                                />
                                <Icon path={mdiDomain} color="white" size={1.2} />
                              </Stack>
                              Organization
                            </span>
                          }
                          className={cx('rounded hoverable', Styles.InfoCard)}>
                          <span className="flow-text">
                            {`${data.Organization.name}, ${data.Organization.location}`}
                          </span>
                        </Card>
                      </Link>

                      <Card
                        title={
                          <span className="card-title grey-text text-darken-4">
                            <Stack size={1.8}>
                              <Icon
                                path={mdiCheckboxBlankCircle}
                                color="var(--orange)"
                                size={1.8}
                              />
                              <Icon path={mdiAlphaH} color="white" size={1.2} />
                            </Stack>
                            H Index
                          </span>
                        }
                        className={cx('rounded', Styles.InfoCard)}>
                        <span className="flow-text">{data.hIndex}</span>
                      </Card>

                      <Card
                        title={
                          <span className="card-title grey-text text-darken-4">
                            <Stack size={1.8}>
                              <Icon
                                path={mdiCheckboxBlankCircle}
                                color="var(--orange)"
                                size={1.8}
                              />
                              <Icon
                                path={mdiFileDocumentBoxMultipleOutline}
                                color="white"
                                size={1}
                              />
                            </Stack>
                            Documents
                          </span>
                        }
                        className={cx('rounded', Styles.InfoCard)}>
                        <span className="flow-text">{data.documents_count}</span>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Section>
            </Tab>
            <Tab title="Documents" active>
              <DocumentsTable data={data.Documents} className={Styles.Table} />
            </Tab>
          </Tabs>
        )
      }
    }

    return (
      <>
        <Helmet>
          <title>Educabile - Azienda</title>
          <meta
            name="description"
            content="Educabile Srl si propone referente affidabile nel gestire scenari complessi ad alto contenuto tecnologico"
          />
          <meta
            name="keyword"
            content="educabile, referente, affidabile, tecnologico, tecnologia"
          />
          <meta name="theme-color" content="#f98012" />
        </Helmet>
        <Banner text={text} />
        {content}
      </>
    )
  }
}

export default AuthorPage
