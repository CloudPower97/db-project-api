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
} = require('../controllers/numbers')

const router = express.Router()

router.get('/', getNumeri)

router.get('/:id', getNumero)

router.get('/:id/rivista', getRivista)

router.get('/:id/articoli', getArticoli)

router.post('/', postNumero)

router.put('/', putNumero)

router.delete('/:id', deleteNumero)

router.patch('/:id', patchNumero)

module.exports = router
