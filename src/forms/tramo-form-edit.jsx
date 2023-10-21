import { Button } from '@/components/button'
import styles from './from.module.css'
import { Input } from '@/components/input'
import { useEffect, useState } from 'react'
import { Modal } from '@/components/modal'

const fields = {
  nombre: 'nombre',
  metro: 'metro',
  metroTeorico: 'metroTeorico',
}

export const TramoFormEdit = ({ index, handleSubmit, tramo, handleDelete }) => {
  const [vals, setVals] = useState({
    nombre: tramo.nombre,
    metro: tramo.metro,
    metroTeorico: tramo.metroTeorico || '',
  })
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    setVals({
      nombre: tramo.nombre,
      metro: tramo.metro,
      metroTeorico: tramo.metroTeorico || '',
    })
  }, [tramo.nombre, tramo.metro, tramo.metroTeorico])

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()

        let values = {}

        for (const [key, val] of Object.entries(fields)) {
          values[key] = e.target[val].value
        }

        handleSubmit(values)
        e.target.reset()
      }}
    >
      <div>
        <h3>Modificar tramo ({index + 1})</h3>
        <Input
          label="Nombre del tramo"
          name={fields.nombre}
          type="text"
          value={vals.nombre}
          onChange={(e) => {
            setVals((v) => ({
              ...v,
              [fields.nombre]: e.target.value,
            }))
          }}
          required
        />
        <Input
          label="Metros medido"
          name={fields.metro}
          type="number"
          value={vals.metro}
          onChange={(e) => {
            setVals((v) => ({
              ...v,
              [fields.metro]: e.target.value,
            }))
          }}
          required
        />
        <Input
          label="Metros organizacion (opcional)"
          name={fields.metroTeorico}
          type="number"
          value={vals.metroTeorico}
          onChange={(e) => {
            setVals((v) => ({
              ...v,
              [fields.metroTeorico]: e.target.value,
            }))
          }}
        />
      </div>
      <div className={styles.btnBox}>
        <Button type="submit">Modificar</Button>
        <Button
          type="button"
          onClick={() => setShowDelete(true)}
          style={{ backgroundColor: 'red' }}
        >
          Eliminar
        </Button>
      </div>
      <Modal open={showDelete} onClose={() => setShowDelete(false)}>
        <div className={styles.sureBox}>
          <h4>¿Seguro deseas eliminar el tramo "{tramo.nombre}"?</h4>
          <Button
            type="button"
            onClick={() => {
              setShowDelete(false)
              handleDelete()
            }}
            style={{ backgroundColor: 'red', width: '70px' }}
          >
            Sí
          </Button>
        </div>
      </Modal>
    </form>
  )
}
