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

router.get('/:Id', getSponsor)

router.get('/:Id/conferenze', getConferenze)

router.post('/', postSponsor)

router.put('/', putSponsor)

router.delete('/:Id', deleteSponsor)

router.patch('/:Id', patchSponsor)

module.exports = router
