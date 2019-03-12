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
} = require('../controllers/periodical')

const router = express.Router()

router.get('/', getRiviste)

router.get('/:id', getRivista)

router.get('/:id/numeri', getNumeri)

router.get('/:id/casa-editrice', getCasaEditrice)

router.post('/', postRivista)

router.put('/', putRivista)

router.delete('/:id', deleteRivista)

router.patch('/:id', patchRivista)

module.exports = router
