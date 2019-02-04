const express = require('express')
const {
  getArticoli,
  getRivista,
  getNumeri,
  getNumero,
  postNumero,
  postNumero: putNumero,
  deleteNumero,
  patchNumero,
} = require('../controllers/numeri')

const router = express.Router()

router.get('/', getNumeri)

router.get('/:Id', getNumero)

router.get('/:Id/rivista', getRivista)

router.get('/:Id/articoli', getArticoli)

router.post('/', postNumero)

router.put('/', putNumero)

router.delete('/:Id', deleteNumero)

router.patch('/:Id', patchNumero)

module.exports = router
