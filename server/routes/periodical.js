const express = require('express')
const {
  getPublishingCompany,
  getPeriodical,
  getPeriodicalNumbers,
  getPeriodicals,
  createPeriodical,
  deletePeriodical,
  updatePeriodical,
} = require('../controllers/periodical')

const router = express.Router()

router.get('/', getPeriodicals)

router.get('/:id', getPeriodical)

router.get('/:id/numbers', getPeriodicalNumbers)

router.get('/:id/publishing-company', getPublishingCompany)

router.post('/', createPeriodical)

router.delete('/:id', deletePeriodical)

router.patch('/:id', updatePeriodical)

module.exports = router
