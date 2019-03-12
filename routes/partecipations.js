const express = require('express')
const {
  getPartecipazione,
  postPartecipazione,
  postPartecipazione: putPartecipazione,
  deletePartecipazione,
  patchPartecipazione,
} = require('../controllers/partecipations')

const router = express.Router()

router.get('/', getPartecipazione)

router.post('/', postPartecipazione)

router.put('/', putPartecipazione)

router.delete('/:IdConferenza/:IdOrg', deletePartecipazione)

router.patch('/:IdConferenza/:IdOrg', patchPartecipazione)

module.exports = router
