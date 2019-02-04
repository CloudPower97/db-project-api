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
} = require('../controllers/documenti')

const router = express.Router()

router.get('/', getDocumenti)

router.get('/:Id/conferenza', getConferenza)

router.get('/:Id/rivista', getNumeroRivista)

router.get('/:Id/autori', getAutori)

router.get('/:Id/citazioni', getCitazioni)

router.get('/:Id', getDocumento)

router.post('/', postDocumento)

router.put('/', putDocumento)

router.delete('/:Id', deleteDocumento)

router.patch('/:Id', patchDocumento)

module.exports = router
