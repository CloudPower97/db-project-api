const db = require('../models').sequelize

const Partecipazioni = db.import('../models/partecipation.js')

exports.getPartecipazione = ({ query }, res) => {
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

exports.postPartecipazione = ({ body }, res) => {
  Partecipazioni.create(body)
    .then(partecipazione => {
      res.status(201).json(partecipazione)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchPartecipazione = ({ body, params: { IdConferenza, IdOrg } }, res) => {
  Partecipazioni.findOne({
    where: {
      IdConferenza,
      IdOrg,
    },
  })
    .then(partecipazione => {
      if (partecipazione) {
        partecipazione
          .update(body)
          .then(partecipazione => {
            res.json(partecipazione)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deletePartecipazione = ({ params: { IdConferenza, IdOrg } }, res) => {
  Partecipazioni.destroy({
    where: {
      IdConferenza,
      IdOrg,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
