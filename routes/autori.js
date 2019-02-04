const express = require('express')
const {
  getAutori,
  getAutore,
  postAutore,
  postAutore: putAutore,
  deleteAutore,
  patchAutore,
  getDocumenti,
  getOrganizzazione,
  getIndiceH,
} = require('../controllers/autori')

const router = express.Router()

router.get('/', getAutori)

router.get('/:ORCID', getAutore)

router.get('/:ORCID/documenti', getDocumenti)

router.get('/:ORCID/organizzazione', getOrganizzazione)

router.get('/:ORCID/indice-h', getIndiceH)

router.post('/', postAutore)

router.put('/', putAutore)

router.delete('/:ORCID', deleteAutore)

router.patch('/:ORCID', patchAutore)

module.exports = router
