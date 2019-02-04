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
} = require('../controllers/organizzazioni')

const router = express.Router()

router.get('/', getOrganizzazioni)

router.get('/:Id', getOrganizzazione)

router.get('/:Id/conferenze', getConferenze)

router.get('/:Id/autori', getAutori)

router.post('/', postOrganizzazione)

router.put('/', putOrganizzazione)

router.delete('/:Id', deleteOrganizzazione)

router.patch('/:Id', patchOrganizzazione)

module.exports = router
