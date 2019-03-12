const express = require('express')
const {
  getPeriodicalNumber,
  getCitedDocuments,
  getCitingDocuments,
  getAuthors,
  getDocuments,
  getConference,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
} = require('../controllers/documents')

const router = express.Router()

router.get('/', getDocuments)

router.get('/:id/conference', getConference)

router.get('/:id/periodical-number', getPeriodicalNumber)

router.get('/:id/authors', getAuthors)

router.get('/:id/citing-documents', getCitingDocuments)

router.get('/:id/cited-documents', getCitedDocuments)

router.get('/:id', getDocument)

router.post('/', createDocument)

router.delete('/:id', deleteDocument)

router.patch('/:id', updateDocument)

module.exports = router
