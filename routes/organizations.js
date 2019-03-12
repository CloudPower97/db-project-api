const express = require('express')
const {
  getAutori,
  getOrganizzazione,
  getConferenze,
  getOrganizzazioni,
  postOrganizzazione,
  postOrganizzazione: putOrganizzazione,
  deleteOrganizzazione,
  patchOrganizzazione,
} = require('../controllers/organizations')

const router = express.Router()

router.get('/', getOrganizzazioni)

router.get('/:id', getOrganizzazione)

router.get('/:id/conferenze', getConferenze)

router.get('/:id/autori', getAutori)

router.post('/', postOrganizzazione)

router.put('/', putOrganizzazione)

router.delete('/:id', deleteOrganizzazione)

router.patch('/:id', patchOrganizzazione)

module.exports = router
