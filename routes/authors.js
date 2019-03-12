const express = require('express')
const {
  getAuthors,
  getAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthor,
  getDocuments,
  getOrganization,
  getHIndex,
} = require('../controllers/authors')

const router = express.Router()

router.get('/', getAuthors)

router.get('/:ORCID', getAuthor)

router.get('/:ORCID/documents', getDocuments)

router.get('/:ORCID/organization', getOrganization)

router.get('/:ORCID/h-index', getHIndex)

router.post('/', createAuthor)

router.delete('/:ORCID', deleteAuthor)

router.patch('/:ORCID', updateAuthor)

module.exports = router
