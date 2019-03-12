const express = require('express')
const {
  getSponsors,
  getConference,
  getOrganizations,
  getConferences,
  getDocuments,
  createConference,
  deleteConference,
  updateConference,
} = require('../controllers/conferences')

const router = express.Router()

router.get('/', getConferences)

router.get('/:id', getConference)

router.get('/:id/documents', getDocuments)

router.get('/:id/organizations', getOrganizations)

router.get('/:id/sponsors', getSponsors)

router.post('/', createConference)

router.delete('/:id', deleteConference)

router.patch('/:id', updateConference)

module.exports = router
