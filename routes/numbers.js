const express = require('express')
const {
  getDocuments,
  getPeriodical,
  getNumbers,
  getNumber,
  createNumber,
  deleteNumber,
  updateNumber,
} = require('../controllers/numbers')

const router = express.Router()

router.get('/', getNumbers)

router.get('/:id', getNumber)

router.get('/:id/periodical', getPeriodical)

router.get('/:id/documents', getDocuments)

router.post('/', createNumber)

router.delete('/:id', deleteNumber)

router.patch('/:id', updateNumber)

module.exports = router
