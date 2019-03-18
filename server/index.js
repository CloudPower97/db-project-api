const express = require('express')
const path = require('path')
const sequelize = require('./models').sequelize
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const {
  publishingCompaniesRouter,
  authorsRouter,
  documentsRouter,
  organizationsRouter,
  conferencesRouter,
  numbersRouter,
  periodicalRouter,
  writeRouter,
  citationsRouter,
  partecipationsRouter,
  sponsorsRouter,
  sponsorshipRouter,
} = require('./routes')

const { PORT, NODE_ENV } = process.env

sequelize
  .authenticate()
  .then(() => {
    express()
      .use(helmet())
      .use(cors())
      .use(express.json())
      .use(
        express.urlencoded({
          extended: false,
        })
      )
      .use(morgan('combined'))
      .use(express.static(path.join(__dirname, 'client/build')))
      .use('/api/organizations', organizationsRouter)
      .use('/api/publishing-companies', publishingCompaniesRouter)
      .use('/api/periodicals', periodicalRouter)
      .use('/api/numbers', numbersRouter)
      .use('/api/conferences', conferencesRouter)
      .use('/api/sponsors', sponsorsRouter)
      .use('/api/sponsorship', sponsorshipRouter)
      .use('/api/documents', documentsRouter)
      .use('/api/authors', authorsRouter)
      .use('/api/write', writeRouter)
      .use('/api/citations', citationsRouter)
      .use('/api/partecipations', partecipationsRouter)
      .get('*', (req, res) => {
        res.sendfile(
          path.join(
            `${__dirname}/client/${NODE_ENV === 'production' ? 'build' : 'public'}/index.html`
          )
        )
      })
      .listen(PORT, () => {
        /* eslint-disable-next-line */
        console.log(`Listening on port ${PORT}`)
      })
  })
  .catch(err => {
    /* eslint-disable-next-line */
    console.error(err)
    process.exit()
  })
