const express = require('express')
const {
  getCitazione,
  postCitazione,
  postCitazione: putCitazione,
  deleteCitazione,
  patchCitazione,
} = require('../controllers/citazioni')

const router = express.Router()

router.get('/', getCitazione)

router.post('/', postCitazione)

router.put('/', putCitazione)

router.delete('/:IdDocCheCita/:IdDocCitato', deleteCitazione)

router.patch('/:IdDocCheCita/:IdDocCitato', patchCitazione)

module.exports = router
