const express = require('express')
const {
  getConferences,
  getSponsors,
  getSponsor,
  createSponsor,
  deleteSponsor,
  updateSponsor,
} = require('../controllers/sponsors')

const router = express.Router()

router.get('/', getSponsors)

router.get('/:id', getSponsor)

router.get('/:id/conferences', getConferences)

router.post('/', createSponsor)

router.delete('/:id', deleteSponsor)

router.patch('/:id', updateSponsor)

module.exports = router
