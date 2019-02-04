const Sponsorizzazione = require('../models/sponsorizzazioni')
const db = require('../connectors/db')

exports.getSponsorizzazioni = (req, res) => {
  const { query } = req

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

exports.postSponsorizzazione = (req, res) => {
  const { body } = req

  Sponsorizzazione.create(body)
    .then(scrittura => {
      res.status(201).json(scrittura)
    })
    .catch(err => {
      res.json(err)
    })
}

exports.patchSponsorizzazione = (req, res) => {
  const {
    body,
    params: { IdSponsor, IdConferenza },
  } = req

  Sponsorizzazione.update(body, {
    where: {
      IdSponsor,
      IdConferenza,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.deleteSponsorizzazione = (req, res) => {
  const {
    params: { IdSponsor, IdConferenza },
  } = req

  Sponsorizzazione.find({
    where: {
      IdSponsor,
      IdConferenza,
    },
  })
    .then(scrittura => {
      if (scrittura) {
        db.query('DELETE FROM SPONSORIZZAZIONE WHERE "IdSponsor"=? AND "IdConferenza"=?', {
          raw: true,
          replacements: [IdSponsor, IdConferenza],
        })
          .then(() => {
            res.status(200).json({})
          })
          .catch(err => {
            res.json(err)
          })
      } else {
        res.status(404).json({})
      }
    })
    .catch(() => {
      res.status(404)
    })
}
