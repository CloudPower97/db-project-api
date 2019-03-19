const express = require('express')
const { createWrite, deleteWrite, updateWrite } = require('../controllers/write')

const router = express.Router()

router.post('/', createWrite)

router.delete('/:document_id/:author_id', deleteWrite)

router.patch('/:document_id/:author_id', updateWrite)

module.exports = router
