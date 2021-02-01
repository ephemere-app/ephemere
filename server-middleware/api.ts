import express from 'express'
import bodyParser from 'body-parser'
import { v4 as uuid4 } from 'uuid'
import Redis from 'ioredis'

const environment = process.env.NODE_ENV
const production = environment === 'production'
const redisDsn = process.env.REDIS_DSN || ''

const client = new Redis(redisDsn)
const api = express()

enum ExpirationDuration {
  oneMinute = '1m',
  fiveMinutes = '5m',
  fifteenMinutes = '15m',
  oneHour = '1h',
  oneDay = '1d',
  twoDays = '2d',
  oneWeek = '1w',
}

function expiration(expiration: string): Date {
  const expirationMapping = new Map<string, (date: Date) => void>([
    [
      ExpirationDuration.oneMinute,
      (date) => {
        date.setMinutes(date.getMinutes() + 1)
      },
    ],
    [
      ExpirationDuration.fiveMinutes,
      (date) => {
        date.setMinutes(date.getMinutes() + 5)
      },
    ],
    [
      ExpirationDuration.fifteenMinutes,
      (date) => {
        date.setMinutes(date.getMinutes() + 15)
      },
    ],
    [
      ExpirationDuration.oneHour,
      (date) => {
        date.setHours(date.getHours() + 1)
      },
    ],
    [
      ExpirationDuration.oneDay,
      (date) => {
        date.setDate(date.getDate() + 1)
      },
    ],
    [
      ExpirationDuration.twoDays,
      (date) => {
        date.setDate(date.getDate() + 2)
      },
    ],
    [
      ExpirationDuration.oneWeek,
      (date) => {
        date.setDate(date.getDate() + 7)
      },
    ],
  ])

  const exp = new Date()
  const expMap = expirationMapping.get(expiration)
  if (expMap) {
    expMap(exp)
  }

  return exp
}

api.set('trust proxy', production)
api.use(bodyParser.json())
api.use(function cleverCloudMonitoring(req, res, next) {
  if (req.header('X-CleverCloud-Monitoring') === 'telegraf') {
    return res.sendStatus(200)
  }
  next()
})

api.post('/box', async (req, res) => {
  const boxExpireAt = expiration(req.body.expireIn)
  const boxExpireTs = Math.floor(boxExpireAt.getTime() / 1000)
  const boxId = uuid4()
  const boxKey = `box:${boxId}`
  const boxValue = {
    content: req.body.content,
    expireAt: boxExpireAt.toISOString(),
  }

  await client.set(boxKey, JSON.stringify(boxValue))
  await client.expireat(boxId, boxExpireTs)

  res.status(200).json({ id: boxId })
})

api.get('/box/:boxId', async (req, res) => {
  const boxId = req.params.boxId
  const boxKey = `box:${boxId}`
  const boxValue = await client.get(boxKey)
  if (boxValue) {
    return res.status(200).json({
      id: boxId,
      data: JSON.parse(boxValue),
    })
  }

  return res.status(404).json({
    detail: 'Box not found',
  })
})

export default api
