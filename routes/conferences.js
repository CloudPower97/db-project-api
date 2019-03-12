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
} = require('../controllers/conferences')

const router = express.Router()

router.get('/', getConferenze)

router.get('/:id', getConferenza)

router.get('/:id/documenti', getDocumenti)

router.get('/:id/organizzazioni', getOrganizzazioni)

router.get('/:id/sponsors', getSponsors)

router.post('/', postConferenza)

router.put('/', putConferenza)

router.delete('/:id', deleteConferenza)

router.patch('/:id', patchConferenza)

module.exports = router
