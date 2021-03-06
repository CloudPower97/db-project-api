const authorsRouter = require('./authors'),
  publishingCompaniesRouter = require('./publishingCompanies'),
  citationsRouter = require('./citations'),
  conferencesRouter = require('./conferences'),
  documentsRouter = require('./documents'),
  organizationsRouter = require('./organizations'),
  numbersRouter = require('./numbers'),
  sponsorsRouter = require('./sponsors'),
  periodicalRouter = require('./periodical'),
  writeRouter = require('./write'),
  partecipationsRouter = require('./partecipations'),
  sponsorshipRouter = require('./sponsorship')

module.exports = {
  authorsRouter,
  publishingCompaniesRouter,
  citationsRouter,
  conferencesRouter,
  documentsRouter,
  organizationsRouter,
  sponsorsRouter,
  numbersRouter,
  periodicalRouter,
  writeRouter,
  partecipationsRouter,
  sponsorshipRouter,
}
