import { query } from '../database'
import { getUserAndCheckSession } from '../session'

export async function GET(request) {
  try {
    const user = await getUserAndCheckSession()

    const carrerasData = await query(async (database) => {
      const collection = database.collection('carreras')
      return await collection.findOne({ user })
    })

    return Response.json(carrerasData?.carreras || [])
  } catch (err) {
    console.log(err)
    if (err?.message === 'Sesión incorrecta')
      return Response.json({ message: 'Sesión incorrecta' }, { status: 401 })

    return Response.json({ message: 'Error al acceder' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const user = await getUserAndCheckSession()

    const body = await request.json()
    if (!body || !Array.isArray(body))
      return Response.json({ message: 'Petición incorrecta' }, { status: 400 })

    await query(async (database) => {
      const collection = database.collection('carreras')
      await collection.updateOne(
        { user },
        { $set: { user, carreras: body } },
        { upsert: true }
      )
    })

    return Response.json({ success: true })
  } catch (err) {
    console.log(err)
    if (err?.message === 'Sesión incorrecta')
      return Response.json({ message: 'Sesión incorrecta' }, { status: 401 })

    return Response.json({ message: 'Error al acceder' }, { status: 500 })
  }
}
