const Citazioni = require('../models/citazioni')
const db = require('../connectors/db')

exports.getCitazione = (req, res) => {
  const { query } = req

  if (Object.keys(query).includes('id_doc_citato_exclude')) {
    db.query(
      `SELECT *
       FROM DOCUMENTO
       WHERE NOT "Id"  = ?
       MINUS
       SELECT *
       FROM DOCUMENTO
       WHERE "Id" IN (
        SELECT "IdDocCitato"
        FROM CITAZIONE
        WHERE "IdDocCheCita" = ?
      )`,
      {
        raw: true,
        replacements: [query.id_doc_citato_exclude, query.id_doc_citato_exclude],
      }
    )
      .then(([result]) => {
        res.json(result)
      })
      .catch(({ message }) => {
        res.status(404).json({ message })
      })
  }

  if (Object.keys(query).includes('id_doc_che_citano_exclude')) {
    db.query(
      `SELECT *
       FROM DOCUMENTO
       WHERE NOT "Id" IN (
        SELECT DISTINCT "IdDocCitato"
        FROM CITAZIONE
        WHERE "IdDocCitato" = ?
       ) AND NOT "Id" = ?
      MINUS
      SELECT *
      FROM DOCUMENTO
      WHERE "Id" IN (
        SELECT "IdDocCheCita"
        FROM CITAZIONE
        WHERE "IdDocCitato" = ?
      )`,
      {
        raw: true,
        replacements: [
          query.id_doc_che_citano_exclude,
          query.id_doc_che_citano_exclude,
          query.id_doc_che_citano_exclude,
        ],
      }
    )
      .then(([result]) => {
        res.json(result)
      })
      .catch(() => {
        res.status(404).json({
          error: 'Not found',
        })
      })
  }
}

exports.postCitazione = (req, res) => {
  const { body } = req

  Citazioni.create(body)
    .then(citazione => {
      res.status(201).json(citazione)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.patchCitazione = (req, res) => {
  const {
    body,
    params: { IdDocCitato, IdDocCheCita },
  } = req

  Citazioni.update(body, {
    where: {
      IdDocCitato,
      IdDocCheCita,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.deleteCitazione = (req, res) => {
  const {
    params: { IdDocCitato, IdDocCheCita },
  } = req

  Citazioni.find({
    where: {
      IdDocCitato,
      IdDocCheCita,
    },
  })
    .then(citazione => {
      if (citazione) {
        db.query('DELETE FROM CITAZIONE WHERE "IdDocCitato"=? AND "IdDocCheCita"=?', {
          raw: true,
          replacements: [IdDocCitato, IdDocCheCita],
        })
          .then(err => {
            res.status(200).json(err)
          })
          .catch(err => {
            res.json(err)
          })
      } else {
        res.status(404).json({})
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
}
