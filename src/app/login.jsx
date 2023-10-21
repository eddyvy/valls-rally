import { LoginForm } from '@/forms/login-form'
import { useState } from 'react'
import axios from 'axios'

export function Login({ setSession }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = (vals) => {
    setLoading(true)
    setError(null)

    axios
      .post('/api/auth', vals)
      .then(({ data }) => {
        setSession(data.session)
        localStorage?.setItem('session', data.session)
      })
      .catch(({ response: { data } }) => {
        setError(data?.message || 'Error haciendo login')
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <LoginForm handleSubmit={handleSubmit} loading={loading} />
      {error && <p style={{ color: 'red', fontSize: 'small' }}>{error}</p>}
    </>
  )
}
