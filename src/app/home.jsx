'use client'

import { Select } from '@/components/select'
import styles from './page.module.css'
import { useState, useMemo, useId, useEffect } from 'react'
import { Grid } from '@/components/grid'
import { calcularTramos } from '@/func/calculo'
import { Modal } from '@/components/modal'
import { Button } from '@/components/button'
import { ButtonSmall } from '@/components/button-small'
import { CarreraForm } from '@/forms/carrera-form'
import { TramoForm } from '@/forms/tramo-form'
import { TramoFormEdit } from '@/forms/tramo-form-edit'
import { Rally } from './rally'
import axios from 'axios'

// 'use client'
export function Home({ session }) {
  const [datosIniciales, setDatosIniciales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('/api/carreras', { headers: { Authorization: 'Bearer ' + session } })
      .then(({ data }) => setDatosIniciales(data))
      .catch()
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Ha habido un error. {error}</p>
      ) : (
        <Rally datosIniciales={datosIniciales} session={session} />
      )}
    </>
  )
}
