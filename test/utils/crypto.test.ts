import { decodeBase64, encodeBase64 } from 'tweetnacl-util'
import faker from 'faker'
import * as crypto from '~/utils/crypto'

faker.seed(1234)

describe('utils/crypto', () => {
  it('can generate a key', () => {
    const key = crypto.generateKey()
    expect(key.length).toBeGreaterThan(1)
  })

  it('can encrypt and decrypt an object', () => {
    const key = crypto.generateKey()
    const user = {
      username: faker.internet.userName(),
    }

    const encrypted = crypto.encrypt(user, key)
    expect(encrypted).not.toBe(JSON.stringify(user))

    const decrypted = crypto.decrypt(encrypted, key)
    expect(decrypted).toStrictEqual(user)
  })

  it('cannot decrypt tempered encrypted string', () => {
    const key = crypto.generateKey()
    const user = {
      username: faker.internet.userName(),
    }

    const encrypted = crypto.encrypt(user, key)
    expect(encrypted).not.toBe(JSON.stringify(user))

    const encryptedBytes = decodeBase64(encrypted)
    encryptedBytes[0] = 0

    expect(() => crypto.decrypt(encodeBase64(encryptedBytes), key)).toThrow()
  })
})
