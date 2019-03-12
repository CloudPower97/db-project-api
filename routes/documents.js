const express = require('express')
const {
  getNumeroRivista,
  getCitazioni,
  getAutori,
  getDocumenti,
  getConferenza,
  getDocumento,
  postDocumento,
  postDocumento: putDocumento,
  deleteDocumento,
  patchDocumento,
} = require('../controllers/documents')

const router = express.Router()

router.get('/', getDocumenti)

router.get('/:id/conferenza', getConferenza)

router.get('/:id/rivista', getNumeroRivista)

router.get('/:id/autori', getAutori)

router.get('/:id/citazioni', getCitazioni)

router.get('/:id', getDocumento)

router.post('/', postDocumento)

router.put('/', putDocumento)

router.delete('/:id', deleteDocumento)

router.patch('/:id', patchDocumento)

module.exports = router
