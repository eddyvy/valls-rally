'use client'

import { useEffect, useState } from 'react'
import { Home } from './home'
import { Login } from './login'
import axios from 'axios'
import styles from './page.module.css'

export default function Main() {
  const [session, setSession] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const locSes = localStorage?.getItem('session')
    if (!locSes) {
      setLoading(false)
      return
    }

    axios
      .get('/api/auth', { headers: { Authorization: 'Bearer ' + locSes } })
      .then(({ data }) => {
        if (!data?.success) {
          setSession(null)
          localStorage?.removeItem('session')
        } else {
          setSession(locSes)
        }
      })
      .catch(() => {
        setSession(null)
        localStorage?.removeItem('session')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Valls Rally</h1>
        <p>¡A por todas!</p>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : session ? (
        <Home session={session} />
      ) : (
        <Login setSession={setSession} />
      )}
    </main>
  )
}
