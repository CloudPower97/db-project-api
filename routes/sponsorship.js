const express = require('express')
const {
  createSponsorship,
  deleteSponsorship,
  updateSponsorship,
} = require('../controllers/sponsorship')

const router = express.Router()

router.post('/', createSponsorship)

router.delete('/:sponsor_id/:conference_id', deleteSponsorship)

router.patch('/:sponsor_id/:conference_id', updateSponsorship)

module.exports = router
