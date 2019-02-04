const Partecipazioni = require('../models/partecipazioni')
const db = require('../connectors/db')

exports.getPartecipazione = (req, res) => {
  const { query } = req

  if (Object.keys(query).includes('id_organizzazione_exclude')) {
    db.query(
      `SELECT *
       FROM CONFERENZA
       WHERE NOT "Id" IN (
        SELECT "IdConferenza"
        FROM PARTECIPAZIONE
        WHERE "IdOrg" = ?)
      `,
      {
        raw: true,
        replacements: [query.id_organizzazione_exclude],
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

  if (Object.keys(query).includes('id_conferenza_exclude')) {
    db.query(
      `SELECT *
       FROM ORGANIZZAZIONE
       WHERE NOT "Id" IN (
        SELECT "IdOrg"
        FROM PARTECIPAZIONE
        WHERE "IdConferenza" = ?)
      `,
      {
        raw: true,
        replacements: [query.id_conferenza_exclude],
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

exports.postPartecipazione = (req, res) => {
  const { body } = req

  Partecipazioni.create(body)
    .then(partecipazione => {
      res.status(201).json(partecipazione)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.patchPartecipazione = (req, res) => {
  const {
    body,
    params: { IdConferenza, IdOrg },
  } = req

  Partecipazioni.update(body, {
    where: {
      IdConferenza,
      IdOrg,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.deletePartecipazione = (req, res) => {
  const {
    params: { IdConferenza, IdOrg },
  } = req

  Partecipazioni.find({
    where: {
      IdConferenza,
      IdOrg,
    },
  })
    .then(scrittura => {
      if (scrittura) {
        db.query('DELETE FROM PARTECIPAZIONE WHERE "IdConferenza"=? AND "IdOrg"=?', {
          raw: true,
          replacements: [IdConferenza, IdOrg],
        })
          .then(() => {
            res.status(200).json({})
          })
          .catch(({ message }) => {
            res.json(message)
          })
      } else {
        res.status(404).json({})
      }
    })
    .catch(({ message }) => {
      res.json(message)
    })
}
