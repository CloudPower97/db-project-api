const express = require('express')
const {
  getScrittura,
  postScrittura,
  postScrittura: putScrittura,
  deleteScrittura,
  patchScrittura,
} = require('../controllers/write')

const router = express.Router()

router.get('/', getScrittura)

router.post('/', postScrittura)

router.put('/', putScrittura)

router.delete('/:IdDocumento/:IdAutore', deleteScrittura)

router.patch('/:IdDocumento/:IdAutore', patchScrittura)

module.exports = router
