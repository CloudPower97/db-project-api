const db = require('../models').sequelize
const Citazioni = db.import('../models/citation.js')

exports.getCitazione = ({ query }, res) => {
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

exports.postCitazione = ({ body }, res) => {
  Citazioni.create(body)
    .then(citazione => {
      res.status(201).json(citazione)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.patchCitazione = ({ body, params: { IdDocCheCita, IdDocCitato } }, res) => {
  Citazioni.update(body, {
    where: {
      IdDocCitato,
      IdDocCheCita,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.deleteCitazione = ({ params: { IdDocCitato, IdDocCheCita } }, res) => {
  Citazioni.destroy({
    where: {
      IdDocCheCita,
      IdDocCitato,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
