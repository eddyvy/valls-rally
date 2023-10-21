import { Button } from '@/components/button'
import styles from './from.module.css'
import { Input } from '@/components/input'

const fields = {
  nombre: 'nombre',
  metro: 'metro',
  metroTeorico: 'metroTeorico',
}

export const TramoForm = ({ index, handleSubmit }) => {
  const idx = index + 1

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
        <h3>Añadir nuevo tramo ({idx})</h3>
        <Input
          label="Nombre del tramo"
          name={fields.nombre}
          type="text"
          defaultValue={`Tramo ${idx}`}
          required
        />
        <Input
          label="Metros medido"
          name={fields.metro}
          type="number"
          required
        />
        <Input
          label="Metros organizacion (opcional)"
          name={fields.metroTeorico}
          type="number"
        />
      </div>
      <div className={styles.btnBox}>
        <Button type="submit">Agregar</Button>
      </div>
    </form>
  )
}
