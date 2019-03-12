const express = require('express')
const {
  getConferenze,
  getSponsors,
  getSponsor,
  postSponsor,
  postSponsor: putSponsor,
  deleteSponsor,
  patchSponsor,
} = require('../controllers/sponsors')

const router = express.Router()

router.get('/', getSponsors)

router.get('/:id', getSponsor)

router.get('/:id/conferenze', getConferenze)

router.post('/', postSponsor)

router.put('/', putSponsor)

router.delete('/:id', deleteSponsor)

router.patch('/:id', patchSponsor)

module.exports = router
