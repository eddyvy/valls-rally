import { query } from '../database'
import { getOrCreateSession, getUserAndCheckSession } from '../session'

export async function GET(request) {
  try {
    await getUserAndCheckSession()

    return Response.json({ success: true })
  } catch (err) {
    console.log(err)
    if (err?.message === 'Sesión incorrecta')
      return Response.json({ message: 'Sesión incorrecta' }, { status: 401 })

    return Response.json({ message: 'Error al acceder' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body || !body?.user || !body?.password)
      return Response.json({ message: 'Petición incorrecta' }, { status: 400 })

    const userData = await query(async (database) => {
      const collection = database.collection('users')
      return await collection.findOne(body)
    })

    if (!userData) {
      return Response.json(
        { message: 'User/password inválido' },
        { status: 401 }
      )
    }

    const session = await getOrCreateSession(body.user)

    return Response.json({ success: true, session })
  } catch (err) {
    console.log(err)
    return Response.json({ message: 'Error al acceder' }, { status: 500 })
  }
}
