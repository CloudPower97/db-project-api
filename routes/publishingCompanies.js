const express = require('express')
const {
  getPublishingCompany,
  getPublishingCompanies,
  createPublishingCompany,
  deletePublishingCompany,
  updatePublishingCompany,
  getPeriodicals,
} = require('../controllers/publishingCompanies')

const router = express.Router()

router.get('/:id/periodicals', getPeriodicals)

router.get('/', getPublishingCompanies)

router.get('/:id', getPublishingCompany)

router.post('/', createPublishingCompany)

router.delete('/:id', deletePublishingCompany)

router.patch('/:id', updatePublishingCompany)

module.exports = router
