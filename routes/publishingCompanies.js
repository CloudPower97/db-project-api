const express = require('express')
const {
  getCasaEditrice,
  getCaseEditrici,
  postCasaEditrice,
  postCasaEditrice: putCasaEditrice,
  deleteCasaEditrice,
  patchCasaEditrice,
  getRiviste,
} = require('../controllers/publishingCompanies')

const router = express.Router()

router.get('/:id/riviste', getRiviste)

router.get('/', getCaseEditrici)

router.get('/:id', getCasaEditrice)

router.post('/', postCasaEditrice)

router.put('/', putCasaEditrice)

router.delete('/:id', deleteCasaEditrice)

router.patch('/:id', patchCasaEditrice)

module.exports = router
