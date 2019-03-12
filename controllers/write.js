const db = require('../models').sequelize

const Redige = db.import('../models/write.js')

exports.getScrittura = ({ query }, res) => {
  if (Object.keys(query).includes('id_autore_exclude')) {
    db.query(
      `SELECT *
     FROM DOCUMENTO
     WHERE NOT "Id" IN (
      SELECT "IdDocumento"
      FROM REDIGE
      WHERE "IdAutore" = ?)
    `,
      {
        raw: true,
        replacements: [query.id_autore_exclude],
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

  if (Object.keys(query).includes('id_documento_exclude')) {
    db.query(
      `SELECT *
       FROM AUTORE
       WHERE NOT "ORCID" IN (
        SELECT "IdAutore"
        FROM REDIGE
        WHERE "IdDocumento" = ?)
      `,
      {
        raw: true,
        replacements: [query.id_documento_exclude],
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

exports.postScrittura = ({ body }, res) => {
  Redige.create(body)
    .then(scrittura => {
      res.status(201).json(scrittura)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchScrittura = ({ body, params: { IdDocumento, IdAutore } }, res) => {
  Redige.update(body, {
    where: {
      IdDocumento,
      IdAutore,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(() => {
      res.status(404)
    })
}

exports.deleteScrittura = ({ params: { IdDocumento, IdAutore } }, res) => {
  Redige.destroy({
    where: {
      IdDocumento,
      IdAutore,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
