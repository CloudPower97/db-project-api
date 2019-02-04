const express = require('express')
const {
  getSponsors,
  getConferenza,
  getOrganizzazioni,
  getConferenze,
  getDocumenti,
  postConferenza,
  postConferenza: putConferenza,
  deleteConferenza,
  patchConferenza,
} = require('../controllers/conferenze')

const router = express.Router()

router.get('/', getConferenze)

router.get('/:Id', getConferenza)

router.get('/:Id/documenti', getDocumenti)

router.get('/:Id/organizzazioni', getOrganizzazioni)

router.get('/:Id/sponsors', getSponsors)

router.post('/', postConferenza)

router.put('/', putConferenza)

router.delete('/:Id', deleteConferenza)

router.patch('/:Id', patchConferenza)

module.exports = router
