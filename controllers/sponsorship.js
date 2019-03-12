const db = require('../models').sequelize

const Sponsorizzazione = db.import('../models/sponsorship.js')

exports.getSponsorizzazioni = ({ query }, res) => {
  if (Object.keys(query).includes('id_sponsor_exclude')) {
    db.query(
      `SELECT *
       FROM CONFERENZA
       WHERE NOT "Id" IN (
        SELECT "IdConferenza"
        FROM SPONSORIZZAZIONE
        WHERE "IdSponsor" = ?)
      `,
      {
        raw: true,
        replacements: [query.id_sponsor_exclude],
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
       FROM SPONSOR
       WHERE NOT "Id" IN (
        SELECT "IdSponsor"
        FROM SPONSORIZZAZIONE
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

exports.postSponsorizzazione = ({ body }, res) => {
  Sponsorizzazione.create(body)
    .then(scrittura => {
      res.status(201).json(scrittura)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.patchSponsorizzazione = ({ body, params: { IdSponsor, IdConferenza } }, res) => {
  Sponsorizzazione.update(body, {
    where: {
      IdSponsor,
      IdConferenza,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteSponsorizzazione = ({ params: { IdSponsor, IdConferenza } }, res) => {
  Sponsorizzazione.destroy({
    where: {
      IdSponsor,
      IdConferenza,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
