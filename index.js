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
      .use('/organizzazioni', organizationsRouter)
      .use('/case-editrici', publishingCompaniesRouter)
      .use('/riviste', periodicalRouter)
      .use('/numeri', numbersRouter)
      .use('/conferenze', conferencesRouter)
      .use('/sponsors', sponsorsRouter)
      .use('/sponsorizzazioni', sponsorshipRouter)
      .use('/documenti', documentsRouter)
      .use('/autori', authorsRouter)
      .use('/redige', writeRouter)
      .use('/citazioni', citationsRouter)
      .use('/partecipazioni', partecipationsRouter)
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
