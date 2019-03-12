const express = require('express')
const {
  createPartecipation,
  deletePartecipation,
  updatePartecipazione,
} = require('../controllers/partecipations')

const router = express.Router()

router.post('/', createPartecipation)

router.delete('/:conference_id/:organization_id', deletePartecipation)

router.patch('/:conference_id/:organization_id', updatePartecipazione)

module.exports = router
