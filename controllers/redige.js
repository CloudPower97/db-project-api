const Redige = require('../models/redige')
const db = require('../connectors/db')

exports.getScrittura = (req, res) => {
  const { query } = req

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

exports.postScrittura = (req, res) => {
  const { body } = req

  Redige.create(body)
    .then(scrittura => {
      res.status(201).json(scrittura)
    })
    .catch(err => {
      res.json(err)
    })
}

exports.patchScrittura = (req, res) => {
  const {
    body,
    params: { IdDocumento, IdAutore },
  } = req

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

exports.deleteScrittura = (req, res) => {
  const {
    params: { IdDocumento, IdAutore },
  } = req

  Redige.find({
    where: {
      IdDocumento,
      IdAutore,
    },
  })
    .then(scrittura => {
      if (scrittura) {
        db.query('DELETE FROM REDIGE WHERE "IdDocumento"=? AND "IdAutore"=?', {
          raw: true,
          replacements: [IdDocumento, IdAutore],
        })
          .then(() => {
            res.status(200).json({})
          })
          .catch(({ message }) => {
            res.json({ message })
          })
      } else {
        res.status(404).json({})
      }
    })
    .catch(() => {
      res.status(404)
    })
}
