const express = require('express')
const {
  getCasaEditrice,
  getRivista,
  getNumeri,
  getRiviste,
  postRivista,
  postRivista: putRivista,
  deleteRivista,
  patchRivista,
} = require('../controllers/riviste')

const router = express.Router()

router.get('/', getRiviste)

router.get('/:Id', getRivista)

router.get('/:Id/numeri', getNumeri)

router.get('/:Id/casa-editrice', getCasaEditrice)

router.post('/', postRivista)

router.put('/', putRivista)

router.delete('/:Id', deleteRivista)

router.patch('/:Id', patchRivista)

module.exports = router
