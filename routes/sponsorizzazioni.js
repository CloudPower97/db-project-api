const express = require('express')
const {
  getSponsorizzazioni,
  postSponsorizzazione,
  postSponsorizzazione: putSponsorizzazione,
  deleteSponsorizzazione,
  patchSponsorizzazione,
} = require('../controllers/sponsorizzazioni')

const router = express.Router()

router.get('/', getSponsorizzazioni)

router.post('/', postSponsorizzazione)

router.put('/', putSponsorizzazione)

router.delete('/:IdSponsor/:IdConferenza', deleteSponsorizzazione)

router.patch('/:IdSponsor/:IdConferenza', patchSponsorizzazione)

module.exports = router
