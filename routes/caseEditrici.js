const express = require('express')
const {
  getCasaEditrice,
  getCaseEditrici,
  postCasaEditrice,
  postCasaEditrice: putCasaEditrice,
  deleteCasaEditrice,
  patchCasaEditrice,
  getRiviste,
} = require('../controllers/caseEditrici')

const router = express.Router()

router.get('/:Id/riviste', getRiviste)

router.get('/', getCaseEditrici)

router.get('/:Id', getCasaEditrice)

router.post('/', postCasaEditrice)

router.put('/', putCasaEditrice)

router.delete('/:Id', deleteCasaEditrice)

router.patch('/:Id', patchCasaEditrice)

module.exports = router
