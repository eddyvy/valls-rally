import CryptoJS from 'crypto-js'
import { headers } from 'next/headers'
import { query } from './database'

export async function getUserAndCheckSession() {
  const headersList = headers()
  const session = headersList.get('Authorization')?.split('Bearer ').at(1)
  if (!session) throw new Error('Sesión incorrecta')

  const sessionData = await query(async (database) => {
    const collection = database.collection('sessions')
    return await collection.findOne({ session })
  })

  if (sessionData?.user) return sessionData.user

  throw new Error('Sesión incorrecta')
}

export async function getOrCreateSession(user) {
  return query(async (database) => {
    const collection = database.collection('sessions')
    const sessionOld = await collection.findOne({ user })

    if (sessionOld) return sessionOld.session

    const session = CryptoJS.SHA1(
      `${Math.random()}${user}${new Date()}`
    ).toString()

    await collection.insertOne({ user, session })

    return session
  })
}
