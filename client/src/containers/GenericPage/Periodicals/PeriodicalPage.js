import React, { Component } from 'react'
import axios from 'axios'
import Spinner from 'components/Spinner'
import Banner from 'components/Banner'
import { Tab, Container, Row, Col, Card, Section } from 'react-materialize'
import Tabs from 'components/Tabs'
import Styles from './PeriodicalPage.module.css'
import cx from 'class-names'
import Icon, { Stack } from '@mdi/react'
import { mdiBarcode, mdiCheckboxBlankCircle, mdiFeather, mdiBuffer } from '@mdi/js'
import NumbersTable from 'components/NumbersTable'
import { Redirect, Link } from 'react-router-dom'

export class PeriodicalPage extends Component {
  state = {
    data: null,
    numbers: [],
    error: false,
  }

  fetchDocument() {
    const { match } = this.props

    axios
      .get(`${match.url}`)
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

    axios
      .get(`${match.url}/numbers`)
      .then(({ data: numbers }) => {
        this.setState({
          numbers,
          error: typeof numbers === 'string',
        })
      })
      .catch(() => {
        this.setState({
          error: true,
        })
      })
  }

  componentDidMount() {
    this.fetchDocument()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchDocument()
    }
  }

  render() {
    const { data, error, numbers } = this.state

    let text = 'Fetching periodical info...'
    let content = <Spinner />

    if (error) {
      return <Redirect to="/periodicals/error" />
    }

    if (!error && data) {
      text = `${data.title}`

      content = (
        <Tabs className="tabs-fixed-width z-depth-1">
          <Tab title="Periodical" active>
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
                      nunc, eu laoreet urna. Sed urna elit, placerat eget quam id, dignissim
                      elementum metus. Aenean sed ullamcorper quam, in condimentum magna. Donec
                      elementum laoreet erat et gravida. Pellentesque augue orci, volutpat eget
                      lectus ac, pretium gravida quam.
                    </Card>
                  </Col>
                  <Col s={12} xl={3} className={cx(Styles.InfoCardsCol)}>
                    <Link to={`/publishing-companies/${data.PublishingCompany.id}`}>
                      <Card
                        title={
                          <span className="card-title grey-text text-darken-4">
                            <Stack size={1.8}>
                              <Icon path={mdiCheckboxBlankCircle} color="var(--red)" size={1.8} />
                              <Icon path={mdiFeather} color="white" size={1} />
                            </Stack>
                            Publisher
                          </span>
                        }
                        className={cx('rounded hoverable', Styles.InfoCard)}>
                        <span className="flow-text">{data.PublishingCompany.name}</span>
                      </Card>
                    </Link>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--red)" size={1.8} />
                            <Icon path={mdiBuffer} color="white" size={1.2} />
                          </Stack>
                          Numbers
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}>
                      <span className="flow-text">{numbers.length}</span>
                    </Card>

                    <Card
                      title={
                        <span className="card-title grey-text text-darken-4">
                          <Stack size={1.8}>
                            <Icon path={mdiCheckboxBlankCircle} color="var(--red)" size={1.8} />
                            <Icon path={mdiBarcode} color="white" size={1.1} />
                          </Stack>
                          ISSN
                        </span>
                      }
                      className={cx('rounded', Styles.InfoCard)}>
                      <span className="flow-text">{data.ISSN}</span>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Section>
          </Tab>
          <Tab title="Numbers">
            <NumbersTable data={numbers} className={Styles.Table} />
          </Tab>
        </Tabs>
      )
    }

    return (
      <>
        <Banner text={text} />
        {content}
      </>
    )
  }
}

export default PeriodicalPage
