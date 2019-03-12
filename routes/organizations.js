const express = require('express')
const {
  getAuthors,
  getOrganization,
  getConferences,
  getOrganizations,
  createOrganization,
  deleteOrganization,
  updateOrganization,
} = require('../controllers/organizations')

const router = express.Router()

router.get('/', getOrganizations)

router.get('/:id', getOrganization)

router.get('/:id/conferences', getConferences)

router.get('/:id/authors', getAuthors)

router.post('/', createOrganization)

router.delete('/:id', deleteOrganization)

router.patch('/:id', updateOrganization)

module.exports = router
