const express = require('express')
const db = require('./models').sequelize
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
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const { PORT } = process.env

db.authenticate()
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
      .use('/organizations', organizationsRouter)
      .use('/publishing-companies', publishingCompaniesRouter)
      .use('/periodicals', periodicalRouter)
      .use('/numbers', numbersRouter)
      .use('/conferences', conferencesRouter)
      .use('/sponsors', sponsorsRouter)
      .use('/sponsorship', sponsorshipRouter)
      .use('/documents', documentsRouter)
      .use('/authors', authorsRouter)
      .use('/write', writeRouter)
      .use('/citations', citationsRouter)
      .use('/partecipations', partecipationsRouter)
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
