require('dotenv').config()
const express = require('express')
const db = require('./connectors/db')
const {
  caseEditriciRouter,
  autoriRouter,
  documentiRouter,
  organizzazioniRouter,
  conferenzeRouter,
  sponsorsRouter,
  numeriRouter,
  rivisteRouter,
  redigeRouter,
  citazioniRouter,
  partecipazioniRouter,
  sponsorizzazioniRouter,
} = require('./routes')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

db.authenticate()
  .then(() => {
    const app = express()

    app.use(helmet())

    app.use(cors())

    app.use(express.json())

    app.use(
      express.urlencoded({
        extended: false,
      })
    )

    app.use(morgan('combined'))

    app.use('/organizzazioni', organizzazioniRouter)

    app.use('/case-editrici', caseEditriciRouter)

    app.use('/riviste', rivisteRouter)

    app.use('/numeri', numeriRouter)

    app.use('/conferenze', conferenzeRouter)

    app.use('/sponsors', sponsorsRouter)

    app.use('/sponsorizzazioni', sponsorizzazioniRouter)

    app.use('/documenti', documentiRouter)

    app.use('/autori', autoriRouter)

    app.use('/redige', redigeRouter)

    app.use('/citazioni', citazioniRouter)

    app.use('/partecipazioni', partecipazioniRouter)

    db.sync()
      .then(() => {
        app.listen(3000)
      })
      .catch(err => {
        console.error(err)
        process.exit()
      })
  })
  .catch(err => {
    console.log(err)
  })
