import React from 'react'
import { Container, Col, Row, Section, MediaBox } from 'react-materialize'
import Helmet from 'react-helmet'
import Styles from './LearnMore.module.css'
import { classDiagramPng, restructuredClassDiagramPng } from 'assets/img'

const LearnMore = () => (
  <>
    <Helmet>
      <title>Database Systems Project - Learn More</title>
    </Helmet>

    <Container>
      <h2>Description</h2>

      <p className="flow-text">
        I was tasked to create a project similar to{' '}
        <a
          href="https://www.scopus.com/freelookup/form/author.uri"
          rel="external noopener noreferrer">
          Scopus
        </a>{' '}
        or{' '}
        <a href="https://clarivate.com/products/web-of-science/" rel="external noopener noreferrer">
          Web of Science
        </a>
        .
      </p>

      <p className="flow-text">
        It had to be developed using a relational database and it should provide these
        functionalities:
      </p>

      <ul className="flow-text" style={{ marginLeft: 35 }}>
        <li> - Store bibliographic informations and citations about scientific publications</li>
        <li>
          {' '}
          - Calculate bibliometric parameters like{' '}
          <a href="https://en.wikipedia.org/wiki/H-index" rel="external noopener noreferrer">
            H-index
          </a>{' '}
          for each authors
        </li>
      </ul>
    </Container>

    <Section className="grey lighten-5">
      <Container>
        <h2>Technology Used</h2>

        <p
          className="flow-text"
          style={{
            fontStyle: 'italic',
          }}>
          The project is hosted on{' '}
          <a href="https://www.heroku.com/home" rel="external noopener noreferrer">
            Heroku
          </a>{' '}
          and you can find the complete source code on{' '}
          <a
            href="https://github.com/CloudPower97/db-project-api"
            rel="external noopener noreferrer">
            GitHub
          </a>
          .
        </p>

        <h3>Back End</h3>
        <p className="flow-text">
          I chose{' '}
          <a href="https://www.postgresql.org/" rel="external noopener noreferrer">
            PostgreSQL
          </a>{' '}
          as the relational database, building a{' '}
          <i>
            <abbr title="Representational State Transfer Application Programming Interface">
              RESTful API
            </abbr>
          </i>{' '}
          with{' '}
          <a href="https://nodejs.org/it/" rel="external noopener noreferrer">
            Node.js
          </a>{' '}
          and{' '}
          <a href="https://expressjs.com/" rel="external noopener noreferrer">
            Express
          </a>
          , using the{' '}
          <a href="http://docs.sequelizejs.com/" rel="external noopener noreferrer">
            Sequelize ORM
          </a>
          .
        </p>

        <h3>Front End</h3>
        <p className="flow-text">
          I built a <abbr title="Single Page Application">SPA</abbr> using{' '}
          <a href="https://reactjs.org/" rel="external noopener noreferrer">
            React
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/react-materialize/react-materialize"
            rel="external noopener noreferrer">
            React Materialize
          </a>{' '}
          following the best <abbr title="User Interface">UI</abbr>/
          <abbr title="User Experience">UX</abbr> practices I've learnt during the{' '}
          <abbr title="Human Computer Interaction">HCI</abbr> exam.
        </p>

        <p className="flow-text">
          You can find the <abbr title="Human Computer Interaction">HCI</abbr> project{' '}
          <a
            href="https://github.com/CloudPower97/Human-Computer-Interaction-Chartreuse-Project"
            rel="external noopener noreferrer">
            here
          </a>
          .
        </p>
      </Container>
    </Section>
    <Container>
      <h2>Class Diagram Design</h2>

      <Row>
        <Col s={6}>
          <MediaBox src={classDiagramPng} caption="Class Diagram" className={Styles.MediaBox} />
        </Col>
        <Col s={6}>
          <MediaBox
            src={restructuredClassDiagramPng}
            caption="Restructured
      Class Diagram"
            className={Styles.MediaBox}
          />
        </Col>
      </Row>
    </Container>
  </>
)

export default LearnMore
