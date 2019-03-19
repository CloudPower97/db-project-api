const express = require('express')
const { createCitation, deleteCitation, updateCitation } = require('../controllers/citations')

const router = express.Router()

router.post('/', createCitation)

router.delete('/:citing_doc_id/:cited_doc_id', deleteCitation)

router.patch('/:citing_doc_id/:cited_doc_id', updateCitation)

module.exports = router
